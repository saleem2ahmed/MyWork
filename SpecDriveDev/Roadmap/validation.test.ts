import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { describe, expect, test } from 'vitest'
import vitestConfig from '../../vitest.config.ts'

// Automated checks from validation.md. Scope checks that depend on git state
// stay manual.

const root = join(import.meta.dirname, '../..')
const read = (path: string) => readFileSync(join(root, path), 'utf8')
const readJson = (path: string) => JSON.parse(read(path))

const projects = [
  { config: 'tsconfig.shared.json', placeholder: 'shared/index.ts' },
  { config: 'tsconfig.server.json', placeholder: 'server/index.ts' },
  { config: 'tsconfig.e2e.json', placeholder: 'e2e/env.ts' },
]

function loadProject(config: string) {
  const parsed = ts.getParsedCommandLineOfConfigFile(join(root, config), undefined, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    },
  })
  if (!parsed) throw new Error(`Could not parse ${config}`)
  return parsed
}

// Type-checks a project, optionally appending source to one file in memory.
function typeErrors(config: string, patch?: { file: string; append: string }) {
  const { options, fileNames } = loadProject(config)
  const host = ts.createCompilerHost(options)
  const readFile = host.readFile
  host.readFile = (fileName) => {
    const text = readFile(fileName)
    return patch && fileName === join(root, patch.file) ? text + patch.append : text
  }
  const program = ts.createProgram(fileNames, options, host)
  return ts.getPreEmitDiagnostics(program)
}

describe('folders and placeholders', () => {
  test.each(['shared/index.ts', 'server/index.ts', 'e2e/env.ts', 'e2e/README.md'])(
    '%s exists',
    (path) => {
      expect(existsSync(join(root, path))).toBe(true)
    },
  )
})

describe('tsconfig projects', () => {
  test('the root tsconfig references the shared, server and e2e projects', () => {
    const paths = readJson('tsconfig.json').references.map((ref: { path: string }) => ref.path)
    expect(paths).toEqual(
      expect.arrayContaining([
        './tsconfig.shared.json',
        './tsconfig.server.json',
        './tsconfig.e2e.json',
      ]),
    )
  })

  test('shared code has no DOM or Node types', () => {
    const { options } = loadProject('tsconfig.shared.json')
    expect(options.types).toEqual([])
    expect(options.lib?.some((lib) => /dom/i.test(lib))).toBe(false)
  })

  test.each(projects)(
    '$config is strict and type-checks $placeholder',
    ({ config, placeholder }) => {
      const { options, fileNames } = loadProject(config)
      expect(options.strict).toBe(true)
      expect(fileNames).toContain(join(root, placeholder))
      expect(typeErrors(config)).toEqual([])
    },
  )

  test.each(projects)(
    'a deliberate type error in $placeholder fails $config',
    ({ config, placeholder }) => {
      const errors = typeErrors(config, {
        file: placeholder,
        append: "\nexport const deliberateError: number = 'not a number'\n",
      })
      expect(errors.map((error) => error.code)).toContain(2322)
    },
  )
})

describe('package.json', () => {
  const pkg = readJson('package.json')

  test('has the test, format and validate scripts', () => {
    expect(pkg.scripts).toMatchObject({
      test: 'vitest run',
      'test:watch': 'vitest',
      format: 'prettier --write .',
      'format:check': 'prettier --check .',
    })
    expect(pkg.scripts.validate).toBeDefined()
  })

  test('prettier and vitest are dev dependencies', () => {
    expect(pkg.devDependencies).toHaveProperty('prettier')
    expect(pkg.devDependencies).toHaveProperty('vitest')
  })

  test('no runtime dependencies were added', () => {
    expect(Object.keys(pkg.dependencies).sort()).toEqual(['react', 'react-dom'])
  })
})

describe('vitest', () => {
  test('does not pick up anything under e2e/', () => {
    expect(vitestConfig.test?.exclude).toContain('e2e/**')
  })
})

describe('roadmap', () => {
  test.each(['0.1', '0.2', '0.3'])('item %s is marked done', (item) => {
    expect(read('specs/roadmap.md')).toContain(`- ☑ **${item}**`)
  })
})

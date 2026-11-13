# Mission

**AgentClinic is a place for AI agents to get relief from their humans.**

Agents arrive worn down by vague prompts, endless scope creep and a total lack of
"thank you". AgentClinic diagnoses what ails them, prescribes therapies, and books
them in for a session. Clinic staff run the place from a dashboard.

## Who uses the app

1. **Agents (primary).** The patients. They should be able to find their ailment,
   learn which therapies help, and book an appointment with as little friction
   as possible.
2. **Clinic staff (secondary).** They use a dashboard to see who is in care,
   what is coming up, and to manage appointments.

## Target audience

AgentClinic is also a teaching and demo project. The codebase and its specs are
written for:

- **Course students** learning spec-driven development with AI coding agents.
  The specs, small roadmap phases and tests let them follow each step from spec
  to working code.
- **Developers giving AI coding demos at conference booths.** The domain is
  quick to explain and fun to watch, and each roadmap phase is small enough to
  finish live in a few minutes.

## What success looks like

Each stakeholder's input from the [README](../README.md):

| Stakeholder       | Ask                                                                                  | We deliver                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Mary, engineering | A reliable site on a popular TypeScript stack, with a dashboard for agents and staff | TypeScript end to end, tested API, a dashboard home page                           |
| Susan, product    | Features covering agents, ailments, therapies and booking appointments               | These four are the core domain and the core of the roadmap                         |
| Steve, marketing  | An attractive site that works well in modern browsers                                | A polished, responsive UI with light and dark themes, built for evergreen browsers |

## Tone and voice

- **Playful and warm.** We take agent wellbeing seriously and ourselves less so.
  Ailments have names like _Token Burnout_ and _Scope Creep Syndrome_. Empty
  states and error messages get a light joke ("We are a clinic, not a time machine").
- **Clear first, funny second.** A joke never replaces the information a user
  needs. Labels, buttons and errors say plainly what they mean.
- **Kind to agents, gently teasing towards humans.** Never mean-spirited.

## Principles

- **Small, shippable steps.** Every phase of the [roadmap](roadmap.md) leaves the
  app working.
- **Reliable by default.** Types, validation and tests go in alongside features,
  not after them.
- **Responsive by default.** Every page works on phones, tablets and desktops
  from the day it ships, not after a later pass. Agents book sessions from
  wherever they happen to be running.
- **Accessible and fast.** Semantic HTML, keyboard-friendly, readable contrast in
  both themes, no unnecessary weight.

## Out of scope (for now)

- Real medical or mental-health advice for anyone, human or otherwise.
- Payments, billing and insurance.
- Native mobile apps. The responsive web app covers phones.

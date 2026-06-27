# CLAUDE.md — coding-drills

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project overview

Open-source template repo that generates 10 adaptive coding exercises daily and reviews your solution the next morning, driven by two OS-scheduled local Claude Code headless jobs. See `README.md` for full behavior.

## Stack

Node (`package.json`), `install.mjs` bootstrap, scheduled headless Claude Code jobs, exercises under `weeks/`, prompts under `prompts/`, tests under `__tests__/`.

## Persistent memory + Marketing skills (global plugins)

Two Claude Code plugins are installed at user scope (active in every project):

**claude-mem** (persistent memory). Session hooks compress each session and inject this project's relevant memory at the start of the next one. Local worker on `localhost:37777`, memory partitioned per project. Optional: run `/learn-codebase` once to ingest the repo.

**marketing-skills** (45 skills). This is a dev/OSS tool, so marketing is secondary, but useful when positioning or launching it. `product-marketing` is the base skill (read first). Most relevant here: `launch` (OSS / Product Hunt launch), `content-strategy`, `copywriting`, `seo-audit`, `ai-seo`.

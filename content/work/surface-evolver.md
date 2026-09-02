---
kind: project
title: Surface Evolver Wrapper
description: >-
  A native desktop app for macOS, Linux and Windows that wraps Ken Brakke's
  Surface Evolver — a 190,000-line C engine for minimising constrained surface
  energy — in a modern three-pane interface with a live WebGL viewer.
date: '2026-08-29'
status: completed
tags:
  - C
  - Rust
  - Tauri
  - Three.js
  - FFI
  - React
  - TypeScript
github: 'https://github.com/sersergious/surface-evolver'
demo: 'https://surface-evolver.vercel.app/'
---

# What it is

Surface Evolver is Ken Brakke's engine for minimising the energy of constrained surfaces — 190,000 lines of C, in continuous use by researchers since the early 1990s. It ships as a terminal program with an X11 graphics window, which is a hard sell in 2026 even for the people who depend on it.

This project wraps that engine in a native desktop application for macOS, Linux and Windows: a syntax-highlighted datafile editor, a command log, and a live WebGL viewer. The engine's own command language is preserved verbatim — nothing was taken away. Installers ship for all three platforms, so end users need no compiler, no X11, and no build step.

# What the desktop app adds

- **A live WebGL viewer** — Three.js rendering with solid, wireframe and X-ray modes, native per-element colors, orbit controls and auto-fit camera. The original offers a basic X11/OpenGL window that many users never get working.
- **Correct periodic (torus) rendering.** Foam and crystal models wrap around a periodic cell. A new C accessor exposes the engine's per-edge wrap codes so wrapped edges are hidden rather than drawn as long lines across the view — 103 of 368 edges in `phelanc.fe`. Non-destructive, unlike the engine's own `detorus`.
- **One-click topology operations** — refine, equiangulate, vertex-average and pop, each reporting element deltas, named topology counters and ΔE where the engine prints raw text you have to parse by eye. Vertices are click-inspectable for id, coordinates and constraints.
- **A real Stop button**, crash isolation, and session auto-restore. Cancelling kills the worker rather than the app, and the surface is snapshotted after every mutating command, so your _evolved_ state comes back after a restart. In the original, Ctrl-C takes the whole program down with your surface.

# Challenges and learnings

**Driving a 1990s C engine that was never designed to be embedded.** Surface Evolver assumes it _is_ the process: `se_init()` corrupts the heap if called twice, unrecoverable errors call `exit()`, it installs process-wide signal handlers, and a failed file open can drop into an interactive stdin prompt. Every one of those is fatal inside a GUI application.

Rather than fight the constraint, I made it the architecture — one engine instance per process, in a throwaway sidecar the backend spawns and kills. Loading a new file kills the old worker. That turned a liability into three features for free: crash isolation, cancel-by-kill, and a guaranteed-clean engine state on every load. I also kept the engine source pristine and put all coupling in a single C facade, which paid off directly — re-forking from upstream later broke only three files.

**FFI, where a mistake is undefined behaviour rather than an error.** Calling C from a managed runtime means hand-writing signatures the compiler cannot check, and passing raw buffers into code that trusts you about their size. One variable stride, where the implementation always wrote three doubles, would have silently overflowed the heap on 2-D models had I sized a buffer from it. The fix was a test that parses the C header and the Rust declarations and asserts they agree, so drift fails CI instead of corrupting memory. I mutation-tested it, because a guard that has never been seen to fail is worth nothing.

**IPC across three languages in two processes.** The UI is TypeScript in a webview, the backend is Rust, and the engine is C in a _different_ process — every user action crosses all of it and has to come back. I settled on line-delimited JSON over stdin/stdout to the sidecar, and a single `rpc(method, params)` command as the only frontend–backend seam. Keeping that seam narrow was the highest-leverage decision in the project: when I migrated the entire desktop framework, the frontend change was one 17-line file. I later ported the sidecar from a 58 MB Bun/TypeScript binary to 345 KB of Rust, verified by driving both implementations with identical command sequences and diffing the parsed responses.

**Owning the whole stack.** The interesting bugs live _between_ the layers — a race between session restore and a user-initiated load, a build script using a shell builtin that does not exist on Windows. The answer was to put a test on every seam, then reduce the number of seams. The C facade carries its own suite of 56 assertions, the FFI boundary has the signature guard above, and the worker protocol is exercised by tests that drive the real binary over stdin the way the backend does.

The other half was refusing to grow. The C facade went from 37 exports to 28 and the worker from 10 commands to 6, because anything already reachable through the engine's own command language did not need a second structured path to keep correct. Narrowing the models the app _claims_ to support — rejecting the two it could never draw honestly — took the bundled library from 17 of 27 datafiles rendering correctly to 20 of 20. Less surface, fewer places for the layers to disagree.

# Tech stack

- **Core engine** — C, built headless as a shared library from Brakke's upstream source, kept unmodified
- **C API** — `se_api.{h,c}`, a 28-function anti-corruption facade with stdout/stderr capture
- **Worker sidecar** — Rust, 345 KB, `libloading` (`dlopen`) and `serde_json`
- **Backend** — Rust, Tauri v2, a single `rpc(method, params)` command over 13 methods
- **Frontend** — React and Vite, Zustand, Three.js / react-three-fiber, Tailwind CSS
- **Build** — CMake, Cargo and Bun, with a GitHub Actions matrix covering all three platforms

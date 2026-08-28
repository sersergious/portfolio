---
kind: project
title: Surface Evolver
description: 'This a Surface Evolver Desktop Application for Windows, Mac and Linux'
date: '2026-07-25'
status: completed
tags:
  - full-stack
  - C
  - React.js
  - Three.js
  - Bun.js
  - Tauri
  - FFI
  - Rust
youtubeUrl: 'https://youtu.be/FiEzFyP_tAg'
github: 'https://github.com/sersergious/surface-evolver'
demo: 'https://surface-evolver.vercel.app/'
---

# Introduction

This is Surface Evolver - a minimal modern cross-platform GUI application designed to wrap the original computational engine into a modern interface, providing an easier way to interact with the program.

# Technical Details

## Considerations and Implementation

The original code, written in C, was designed to be portable. I initially created this as a web application for my capstone project at my university. The architecture primarily relies on a single C file called `se_api.c`, which exposes the engine’s functionality. I then designed the backend and frontend around it. It worked well for local purposes. However, I realized that deploying a web app like this one would require significantly limiting its computational requirements, as it could easily strain the computational resources due to its heavy GPU usage.

Therefore, I ported the app to Tauri (v2) for the demonstration and testing of its current capabilities. While it works well at scale with approximately 90% backward compatibility, the program still requires extensive testing and debugging.

In its current state, this project is designed to serve as a foundation rather than a standalone and feature-complete app.

## Tech Stack

- React.js + Three.js
- Bun.js + bun-ffi
- Tauri
- CMake for compiling the C code

# Conclusion

This project has been an incredibly long and challenging journey. I’ve had to consult with my professors, even asking the most basic questions. Through this experience, I’ve gained valuable insights into working with unfamiliar codebases and legacy software. Additionally, I’ve learned how to effectively utilize AI tools in my projects. My ultimate goal is to continue pursuing new projects and continually challenge myself.

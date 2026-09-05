---
kind: project
title: Group Chat CLI
description: >-
  A console-based group chat server and client written in C — thread-per-connection
  networking, Argon2id password hashing, SQLite persistence and user-created groups,
  shipped as a single Docker image.
date: '2026-08-28'
status: completed
tags:
  - C
  - Sockets
  - SQLite
  - Argon2id
  - Docker
  - Concurrency
github: 'https://github.com/sersergious/groupchat-app'
youtubeUrl: 'https://youtu.be/AfZmLXDy5Tc'
---

# What it is

A group chat system written in pure C — a server, a terminal client, and the wire protocol between them. Users register, create their own groups, join the ones they want, and talk in whichever group they are currently switched into. Nothing is predefined: the system ships empty and users build the groups they need.

Everything runs from one Docker image, so a session starts identically on Linux, macOS and Windows — `docker compose up -d --build` for the server, then `docker compose run --rm client` in as many terminals as you want people. Chat data lives in a named volume and survives restarts. It builds without Docker too, against a C11 compiler, CMake, SQLite3 and Argon2.

It started as coursework for a course in college on Operating Systems and kept going past what the assignment asked for into a feature-complete CLI app.

# Architecture

The client runs two threads with a strict division of work: main reads stdin and writes to the socket, the reader thread blocks on `recv` and writes to stdout. Because those roles never overlap there is no socket lock and no way for a response to be delivered to the wrong reader. Server output prints asynchronously as it arrives, redrawing the prompt underneath it.

The server runs one detached thread per connection. All durable state — users, groups, memberships, messages — lives in SQLite, applied with `CREATE TABLE IF NOT EXISTS` at startup so there is no migration step and no schema file to ship. The only shared in-memory structure is a presence list mapping online users to sockets, which answers the single question SQLite cannot: which file descriptors a broadcast should reach.

# Wire protocol

Every frame in both directions is `int32 tag | int32 length | length bytes`, integers big-endian. Strings are not NUL-terminated in transit; the receiver terminates them. Both binaries include the same `common/protocol.h`, so the two cannot drift apart.

Response codes are split by range rather than by a flag: a tag below 100 is an unsolicited event pushed by the server, and a tag of 200 or more is a response to the client's last request. The ranges never overlap, so the client's single reader thread tells them apart from the tag alone and needs no extra state to route them.

Sending a message returns nothing on success — the sender's own line is already on their screen. Failures always report back.

# Concurrency

Four properties, each with a reason it holds rather than a hope that it does.

**Database writes cannot interleave.** One mutex wraps every database call, so exactly one thread is inside SQLite at a time. This is deliberately simpler than a write queue with a dedicated writer thread: at console-chat volume the lock is uncontended, and it is ten lines instead of a job queue. The upgrade path — a read-only WAL connection per worker, keeping the mutex for writes — is written at the top of `server/db.c` for whoever needs it.

**Registration cannot produce duplicate accounts.** Uniqueness comes from the `UNIQUE` index on `users.email`, not from a check-then-insert. Two simultaneous signups with the same address both attempt the insert; one gets `SQLITE_CONSTRAINT` and is reported as already registered. There is no window between the check and the write because there is no check.

**Broadcasts cannot touch a freed session.** Sessions are added to and removed from the presence list under `g_sessions_lock`, and broadcasts hold that same lock while sending. Holding it across the `send()` is the part that matters: a disconnecting peer cannot unlink and free its session mid-broadcast. The program has exactly one lock ordering — `g_sessions_lock` before the database mutex — and `db.c` never touches the session list, so the reverse order cannot arise.

**The death of a peer cannot kill the server.** `SIGPIPE` is ignored in `main()`, so writing to a socket whose client has vanished fails that one `send()` rather than terminating the process.

# Non-goals

Open join by design — no group ownership, no permissions. Plaintext TCP; only passwords are hashed. Offline users get no push, though full history is available on demand. Console only, no GUI or web client. Each of those is a deliberate boundary rather than an unfinished edge, and keeping them out is what kept the surface small enough to state the concurrency properties above and mean them.

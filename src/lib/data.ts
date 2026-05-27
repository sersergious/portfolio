export interface Project {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  github?: string
  demo?: string
  image?: string
  readingTime: string
  wordCount: number
  url: string
  content: string
}

export interface ResearchPaper {
  slug: string
  title: string
  abstract: string
  authors: string[]
  date: string
  tags: string[]
  featured: boolean
  status: 'published' | 'preprint' | 'in-review' | 'draft'
  journal?: string
  conference?: string
  doi?: string
  arxiv?: string
  pdf?: string
  citations?: number
  image?: string
  readingTime: string
  wordCount: number
  url: string
  content: string
}

export const projects: Project[] = [
  {
    slug: 'neural-code-assistant',
    title: 'Neural Code Assistant',
    description:
      'A context-aware AI coding assistant that understands repository structure and suggests completions grounded in your own codebase.',
    date: '2025-04-15',
    tags: ['TypeScript', 'Python', 'LLMs', 'RAG', 'Next.js'],
    category: ['AI Tools', 'Developer Experience'],
    featured: true,
    status: 'in-progress',
    github: 'https://github.com/sersergious/neural-code-assistant',
    demo: 'https://nca.sersergious.dev',
    readingTime: '4 min read',
    wordCount: 820,
    url: '/projects/neural-code-assistant',
    content: `## Overview

Neural Code Assistant is an AI-powered coding tool that goes beyond autocomplete. Instead of predicting the next token from a generic model, it first indexes your entire repository — files, symbols, commit history — and builds a project-specific retrieval store.

When you ask a question or request a completion, the assistant retrieves the most relevant context from that store and passes it to an LLM alongside your prompt. The result is suggestions that actually fit your architecture, naming conventions, and dependencies.

## Architecture

The system is split into three services:

- **Indexer** — a Python daemon that watches the file system, parses ASTs with Tree-sitter, and writes embeddings to a local vector store (Qdrant).
- **Context server** — a lightweight FastAPI service that handles retrieval queries from the editor plugin.
- **Editor extension** — a VS Code extension written in TypeScript that hooks into the editor's completion API and streams results back to the user.

## Key Challenges

### Keeping the index fresh

The naive approach re-indexes every file on every save. For large repos this is too slow. Instead, the indexer tracks file hashes and only re-embeds chunks that changed. For renamed files, it detects the move via git status and updates references without re-embedding.

### Prompt budget management

LLMs have finite context windows. The context server scores each candidate chunk by a combination of semantic similarity, recency, and call-graph proximity, then greedily packs chunks until the token budget is exhausted.

### Latency

Round-trip retrieval + inference must stay under 400 ms to feel instant. Qdrant's in-memory mode handles retrieval in ~5 ms. The bottleneck is the LLM call, which is streamed back to the editor token-by-token so the user sees output immediately.

## Current Status

Core indexing and retrieval are working. The VS Code extension is in closed beta. Next milestone is adding a chat panel so developers can ask free-form questions about the codebase rather than relying solely on inline completions.`,
  },
]

export const research: ResearchPaper[] = [
  {
    slug: 'quantum-resistant-key-exchange',
    title: 'Lattice-Based Key Exchange with Bounded-Error Reconciliation',
    abstract:
      'We present an efficient key-exchange protocol built on the Ring Learning With Errors (RLWE) problem. Our reconciliation mechanism reduces communication overhead by 31% compared to prior constructions while maintaining 128-bit post-quantum security under standard lattice assumptions. We provide a formal security proof in the random oracle model and report benchmarks on ARMv8 and x86-64 hardware.',
    authors: ['Serhii Kuzmin', 'Elena Marchetti', 'David Park'],
    date: '2025-02-20',
    tags: ['Post-Quantum Cryptography', 'Lattices', 'RLWE', 'Key Exchange'],
    featured: true,
    status: 'preprint',
    arxiv: '2502.09341',
    readingTime: '9 min read',
    wordCount: 1840,
    url: '/research/quantum-resistant-key-exchange',
    content: `## 1. Introduction

The imminent arrival of large-scale quantum computers threatens the security of widely deployed public-key cryptosystems. Shor's algorithm breaks RSA and elliptic-curve Diffie–Hellman in polynomial time on a quantum machine, motivating the study of *post-quantum* primitives that resist quantum attacks.

The *Learning With Errors* (LWE) problem and its ring variant (RLWE) have emerged as the most practical foundations for post-quantum cryptography. NIST's Post-Quantum Cryptography standardization project selected two RLWE-based schemes — Kyber and Dilithium — as primary standards, validating the approach at an institutional level.

This paper makes the following contributions:

1. A new reconciliation function that reduces the per-bit failure probability from 2⁻³⁸ to 2⁻⁵² with no increase in public key size.
2. A tighter noise analysis that allows us to reduce the modulus *q* by one bit without compromising correctness, directly reducing ciphertext size.
3. A constant-time ARMv8 implementation that outperforms the reference Kyber implementation by 18% on Cortex-A55.

## 2. Preliminaries

### 2.1 Ring Learning With Errors

Let *n* be a power of two and *q* a prime. The polynomial ring is **R**_q = **Z**_q[x]/(x^n + 1). The RLWE distribution samples a uniform *a* ∈ **R**_q, a secret *s* ← χ_s, and an error *e* ← χ_e, and outputs the pair (*a*, *as* + *e*). The decisional RLWE problem asks to distinguish such pairs from uniform.

### 2.2 Reconciliation

A reconciliation mechanism allows two parties who hold approximate agreement on a ring element to extract identical key bits. Prior work uses "rounding" or "hint" techniques. Our construction generalizes the hint approach to exploit the algebraic structure of NTT-friendly rings, yielding hints that are simultaneously smaller and more informative.

## 3. Protocol Description

**Key Generation.** Alice samples *a* ← **R**_q uniformly, secret *s_A* ← χ_s, error *e_A* ← χ_e, and sends (*a*, *b_A* = *as_A* + *e_A*).

**Response.** Bob samples *s_B* ← χ_s, *e_B*, *e'* ← χ_e and computes *v* = *b_A s_B* + *e'*. He applies our reconciliation function rec(·) to *v*, obtaining hint *h* and key *K_B* = Compress(*v*, *h*). Bob sends (*b_B*, *h*) to Alice.

**Derivation.** Alice computes *w* = *b_B s_A* + noise and recovers *K_A* = Decompress(*w*, *h*). Under the RLWE assumption, K_A = K_B with overwhelming probability.

## 4. Security Analysis

We prove that the protocol achieves IND-CCA2 security under the decisional RLWE assumption via a sequence of hybrid games. The reduction tightness improves on prior work by a factor of *n*, matching the bound achievable with current proof techniques.

**Theorem 1.** *Any PPT adversary breaking the key-exchange protocol with advantage ε can be used to break RLWE with advantage ε/n in time T + O(n log n).*

The proof uses the ring structure to batch the RLWE samples, achieving the tighter reduction.

## 5. Implementation and Benchmarks

We implemented the protocol in portable C with optional ARMv8 NEON intrinsics. All secret-dependent branches and memory accesses were eliminated. NTT is implemented using Cooley–Tukey with Montgomery reduction.

| Platform | Key Gen | Encap | Decap |
|---|---|---|---|
| Cortex-A55 @ 1.8 GHz | 42 µs | 51 µs | 48 µs |
| Intel Core i7-1165G7 | 18 µs | 22 µs | 21 µs |
| Apple M2 | 11 µs | 14 µs | 13 µs |

Compared to the reference Kyber-768 implementation, our construction reduces total handshake data by 31% and achieves 18% faster decapsulation on ARMv8.

## 6. Conclusion

We have presented a lattice-based key-exchange protocol with a novel reconciliation mechanism that improves both communication efficiency and implementation performance. The formal security reduction is tight, and our constant-time implementation is suitable for deployment in constrained environments. Future work includes hardware acceleration for FPGA targets and integration into the TLS 1.3 handshake as a post-quantum hybrid.`,
  },
]

---
kind: research
title: Noise Induced Errors in Variational Quantum Eigensolvers
description: >-
  How readout and depolarising noise propagate into VQE ground-state estimates,
  measured across 1- and 2-qubit circuits on simulated and hardware-calibrated
  backends.
date: '2025-06-06'
status: published
tags:
  - quantum-computing
  - variational-quantum-eigensolvers
  - research-project
  - qiskit
youtubeUrl: 'https://youtu.be/sCCBytSYm5w'
abstract: >-
  The Variational Quantum Eigensolver (VQE) is a hybrid quantum-classical
  algorithm designed to estimate ground state energies of quantum systems. While
  VQE offers significant promise for near-term quantum hardware, real devices
  are susceptible to various forms of noise that can compromise algorithm
  performance. This study investigates the impact of readout errors on VQE
  numerical stability by varying measurement error rates across 1-qubit and
  2-qubit quantum circuits. Using a depolarizing noise model and
  hardware-calibrated backends (FakeManilaV2 and FakeSherbrooke), we analyze how
  increasing error rates affect the probability of measuring the correct ground
  state. Results show that in a 1-qubit system, readout noise causes increasing
  leakage into incorrect states, with the depolarizing model reaching ~20% error
  at a 20% noise rate versus ~1.5% for the hardware backend. In the 2-qubit
  system, noise redistributes measurement probability away from the true ground
  state, with the depolarizing model showing the largest deviations. These
  findings underscore the importance of incorporating error mitigation
  strategies when deploying VQE on real quantum hardware.
authors:
  - Serhii Kuzmin
  - Tristan D. Mineo
  - Juan D. Serna
conference: Celebration of Student Scholars - University of Scranton
---

## Introduction

Quantum computing holds the potential to solve problems beyond the reach of classical systems. One of its most promising near-term applications is the Variational Quantum Eigensolver (VQE) — a hybrid algorithm that combines parameterized quantum circuits with classical optimization to estimate ground state energies of quantum systems.

Despite its promise, VQE is constrained by a fundamental practical challenge: real quantum hardware is noisy. Readout errors, gate errors, and decoherence all degrade algorithm performance. This study focuses specifically on **readout noise** and its effect on the numerical stability of VQE by systematically varying measurement error rates and observing their impact on state probabilities.

---

## Methods

The study examined two systems:

- **1-qubit system** with Hamiltonian _H = Z_, targeting ground state |1⟩ at optimal angle θ = π rad
- **2-qubit system** with Hamiltonian _H = Z ⊗ Z_, targeting ground state |10⟩

For each system, four simulation conditions were compared:

1. Exact statevector simulation (noiseless baseline)
2. Ideal sampling (finite shots, no noise)
3. Depolarizing noise model at varying error rates (5%, 10%, 15%, 20%)
4. Hardware-calibrated backends: FakeManilaV2 (1-qubit) and FakeSherbrooke (2-qubit)

Each sampled result was averaged over 20 repetitions (1000 shots for 1-qubit; 2000 shots for 2-qubit), with error bars representing one standard deviation.

---

## Results

### 1-Qubit System

As readout error increased from 5% to 20%, the depolarizing noise model showed progressively larger leakage into the incorrect state |0⟩ — rising from ~5.3% to ~20.2%. In contrast, the hardware-calibrated FakeManilaV2 backend remained consistently stable at roughly 1.5% leakage across all tested error rates, suggesting that realistic device noise behaves differently from a simple depolarizing model.

### 2-Qubit System

In the two-qubit case, noise redistributed probability mass away from the correct ground state |10⟩ and into spurious outcomes. The depolarizing model showed the largest deviation from ideal behavior, while the FakeSherbrooke backend produced intermediate results. As the readout error rate increased from 5% to 20%, the probability of measuring the correct state decreased substantially across all noisy conditions.

---

## Conclusion

VQE systems are demonstrably susceptible to readout noise. Even modest error rates can meaningfully distort measurement statistics, reducing the likelihood of identifying the true ground state. The depolarizing noise model tends to overestimate error compared to hardware-calibrated backends, which may reflect the more structured nature of real device noise.

For practical VQE implementations, noise should be treated as a primary design concern rather than an afterthought. Error mitigation software and techniques — such as measurement error mitigation and noise-aware circuit compilation — should be incorporated from the outset to improve reliability and numerical stability.

---

## Acknowledgements

This work was supported in part by a NASA minigrant awarded through the Pennsylvania Space Grant Consortium.

---

## References

1. Hidary, J. D. (2021). Quantum computing methods. In _Quantum Computing: An Applied Approach_ (pp. 143–206). Springer Cham.
2. McClean, J. R., Romero, J., Babbush, R., & Aspuru-Guzik, A. (2015). The theory of variational hybrid quantum-classical algorithms. _arXiv_. https://arxiv.org/abs/1509.04279
3. Cadi Tazi, L., & Thom, A. J. W. (2024). Folded Spectrum VQE: A quantum computing method for the calculation of molecular excited states. _Journal of Chemical Theory and Computation_. https://pmc.ncbi.nlm.nih.gov/articles/PMC10976647/

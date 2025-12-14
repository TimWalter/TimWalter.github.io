+++
title = 'OMAR — Open Multivariate Adaptive Regression'
summary = 'Python package for discovering localised, linear structures in complex, high-dimensional datasets.'
cover1 = 'cover.jpg'
cover1_dark = "dark_cover.jpg"
date = 2025-12-01T00:00:00+01:00
year = 2025
status = 'Completed'
stack = [ 'Python', 'Numba',  'Fortran','OpenMP' ]
repo = 'https://github.com/Helge-Stein-Group/omar'
doi = ''
highlights = [
  'Modernized version of the Multivariate Adaptive Regression Splines (MARS)',
  'Improved numerical efficiency, based on modern rank-one update strategies',
  'Optional Fortran acceleration with OpenMP parallelism for large datasets',
]
+++

## What is omar?

`omar` (**O**pen **M**ultivariate **A**daptive **R**egression) is a MARS \[Friedman, 1991; 1993] implementation. It approximates high-dimensional functions by an additive model of low-dimensional functions. It does so by exploiting local lower dimensional manifolds by an additive expansion in a subset of the complete tensor product of the univariate truncated power spline basis. To sample the resulting, exponentially growing function space, it employs a heuristic grow-prune strategy.

It is designed to automatically construct accurate, interpretable, and efficient piecewise-linear models of functions with many predictor and one response variable.

`omar` is ideal when:

* You want to find the best possible linear approximation in high-dimensional, noisy data.
* You prefer models with **interpretable basis functions**.
* You need a fast, scalable tool for MARS modeling.

The model has the form:

$$ \hat{f}(x) = \sum_{n} a_n B_n(x) $$

where each $B_n(x) = \prod \text{max}(\pm(x-t),0)$ is a piecewise linear basis function at root $t$.
A basis function therefore looks like this
<p align="center">
  <img src="https://github.com/user-attachments/assets/8dd4b267-0ebb-4309-b533-2fa8609470f7">
</p>
Whereas the full model might fit data like
<p align="center">
  <img height=400pt src="https://github.com/user-attachments/assets/92606a17-e091-44e1-89ae-70d1aeb7e2bd">
</p>
For more insights into the algorithm check out the original paper or the background page.

### Computational Backends

To enable practical use on modern hardware, `omar` includes two compute backends:

* **Pure Python** for accessibility and clarity, speedup with **Numba** for JIT-compiled performance on CPU.
* **Fortran** via `f2py` with native BLAS/LAPACK routines and **OpenMP** parallelism.

## Installation

The easiest way to get started is by installing the prebuilt wheel from PyPI `pip install omar`.

## Citations

* Friedman, J. H. (1991). Multivariate adaptive regression splines. *The Annals of Statistics*, 19(1), 1–67. [[JSTOR](http://www.jstor.org/stable/10.2307/2241837)](http://www.jstor.org/stable/10.2307/2241837)
* Friedman, J. H. (1993). Fast MARS. *Technical Report No. 110*, Stanford University.
* Krause, O., & Igel, C. (2015). A More Efficient Rank-one Covariance Matrix Update for Evolution Strategies. *FOGA '15*, 129–136. [[DOI](https://doi.org/10.1145/2725494.2725496)](https://doi.org/10.1145/2725494.2725496)
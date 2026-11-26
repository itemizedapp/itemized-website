# Security Policy

## Supported Versions

Security fixes are applied to the `main` branch and deployed to the live site.

| Version | Supported |
| --- | --- |
| `main` (production site) | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please report them privately using GitHub's built-in private vulnerability reporting:

- **Website vulnerabilities (`itemized-website`):** <https://github.com/itemizedapp/itemized-website/security/advisories/new>
- **Application vulnerabilities (`itemized`):** <https://github.com/itemizedapp/itemized/security/advisories/new>

### What to Include

To help us investigate and resolve the issue quickly, please include as much of the following as possible:

- A clear description of the vulnerability and its potential impact.
- Step-by-step instructions, affected URLs, or a proof of concept (PoC) to reproduce the issue.
- The commit SHA or deployed page you tested against.
- Any suggested mitigation or patch, if you have one.

### What to Expect

- **Acknowledgment:** We will acknowledge receipt of your report within **3 business days**.
- **Triage & Updates:** We will investigate the report, determine its severity and scope, and keep you updated as we work on a fix.
- **Resolution & Disclosure:** Once a fix is ready, we will coordinate deployment and public disclosure with you. If you would like credit in the advisory, please let us know.

## Scope

This repository contains the static marketing and documentation website for itemized (`itemizedapp.com`). Areas of interest include:

- Cross-site scripting (XSS) or unsafe HTML injection in rendered pages or synced documentation.
- Build/deployment workflow or dependency supply-chain issues.
- Misconfigured security headers, redirects, or external resource loading.

For vulnerabilities in the self-hosted itemized application or live demo (`demo.itemizedapp.com`), please report them on the main [itemized repository](https://github.com/itemizedapp/itemized/security/advisories/new).

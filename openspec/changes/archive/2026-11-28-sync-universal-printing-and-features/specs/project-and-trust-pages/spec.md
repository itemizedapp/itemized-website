## MODIFIED Requirements

### Requirement: About page
The About page (`/about/`) SHALL explain why itemized exists, including its mission to reduce household food waste, its single-binary self-hosted architecture, its open-source home on GitHub, and how users can try it or share feedback.

#### Scenario: Learning about the project
- **WHEN** a visitor opens `/about/`
- **THEN** the page summarizes itemized's purpose (fast, self-hosted household inventory without subscriptions or cloud lock-in), architectural principles (single Go binary, embedded React SPA, single SQLite file, universal label printing, daily push digests, and simple Admin/Member roles), and links to the GitHub repository, issue tracker, and live demo

#### Scenario: Communicating the food-waste reduction mission
- **WHEN** a visitor opens `/about/`
- **THEN** the page clearly states itemized's mission to reduce household food waste by making it effortless to know what food you have, where it is stored, and when it expires before it spoils

#### Scenario: Communicating contribution policy
- **WHEN** a visitor reads the open-source section on `/about/`
- **THEN** the page states that itemized is open source (AGPL-3.0) on GitHub and welcomes bug reports and feature ideas via GitHub Issues while noting that external pull requests are not accepted

### Requirement: Security page
The Security page (`/security/`) SHALL describe itemized's security model for self-hosters and how to report vulnerabilities responsibly.

#### Scenario: Reviewing security posture and reporting a vulnerability
- **WHEN** a self-hoster or security researcher opens `/security/`
- **THEN** the page documents key security controls (local password auth and OIDC SSO with PKCE, Admin/Member roles, SHA-256 hashed Personal API Tokens with optional expiration and instant revocation, non-root container execution via `PUID`/`PGID`, `TRUST_PROXY` rate-limiting behavior, HTTPS requirement for camera access and Web Push notifications, and sandboxed `DEMO_MODE`), and provides clear instructions for reporting security issues via GitHub Security Advisories or the repository

### Requirement: Privacy page
The Privacy page (`/privacy/`) SHALL clearly distinguish between the marketing website's privacy posture and a self-hosted itemized instance's data flow.

#### Scenario: Reviewing website and app privacy
- **WHEN** a visitor opens `/privacy/`
- **THEN** the page states that the marketing website sets no cookies, loads no third-party analytics or ad scripts, and collects no personal data, and clarifies that self-hosted itemized instances store all inventory data locally in SQLite with outbound calls only when the user invokes optional features (OpenFoodFacts barcode lookup, user-configured LLM provider, user-configured OIDC IdP, browser push endpoints for optional Web Push daily digests, or configured LAN label printers)

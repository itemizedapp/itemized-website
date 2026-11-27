# Spec Delta

## MODIFIED Requirements

### Requirement: About page
The About page (`/about/`) SHALL explain why Itemized exists—including its mission to reduce household food waste—its single-binary self-hosted architecture, its open-source home on GitHub, and how to try or contribute to the project.

#### Scenario: Learning about the project
- **WHEN** a visitor opens `/about/`
- **THEN** the page summarizes Itemized's purpose (fast, self-hosted household inventory without subscriptions or cloud lock-in), architectural principles (single Go binary, embedded React SPA, single SQLite file), and links to the GitHub repository, issue tracker, and live demo

#### Scenario: Communicating the food-waste reduction mission
- **WHEN** a visitor opens `/about/`
- **THEN** the page clearly states Itemized's mission to reduce household food waste by making it effortless to know what food you have, where it is stored, and when it expires before it spoils

# Spec Delta

## MODIFIED Requirements

### Requirement: Automated post-build HTML, link, and SEO verification
The project SHALL provide automated check scripts that inspect the built `dist/` output and fail on broken internal links, missing SEO metadata, unexpected third-party scripts, or prohibited em dash characters in marketing website pages.

#### Scenario: Internal link integrity check
- **WHEN** the post-build link check runs against `dist/`
- **THEN** every internal `href`, `src`, and `#fragment` anchor resolves to an existing file or element ID in `dist/`, failing with a clear report if any link is broken

#### Scenario: SEO and metadata check
- **WHEN** the post-build SEO check runs against `dist/`
- **THEN** every public HTML page (excluding `404.html`) has a unique `<title>`, a non-empty `<meta name="description">`, a canonical URL, Open Graph tags, and a single `<h1>`

#### Scenario: Script hygiene check
- **WHEN** the post-build script check runs against `dist/`
- **THEN** no external third-party `<script src="http...">` tags exist in the built HTML

#### Scenario: Em dash prohibition check
- **WHEN** the post-build SEO and copy hygiene check runs against `dist/`
- **THEN** every built marketing website HTML file (excluding `/docs/`) contains zero em dash characters (`—`, U+2014) or em dash HTML entities (`&mdash;`, `&#8212;`, `&#x2014;`) in titles, meta tags, or rendered body content, failing with the offending file path if any are found

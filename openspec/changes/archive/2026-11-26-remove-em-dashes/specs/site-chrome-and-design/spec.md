# Spec Delta

## ADDED Requirements

### Requirement: No em dashes in website copy and metadata
The marketing website SHALL NOT contain em dash characters (`—`, U+2014) or em dash HTML entities (`&mdash;`, `&#8212;`, `&#x2014;`) anywhere in rendered page titles, metadata, headings, body copy, lists, or table cells.

#### Scenario: Page titles and metadata
- **WHEN** a visitor or crawler loads any marketing website page
- **THEN** the `<title>`, `<meta name="description">`, Open Graph tags, Twitter card tags, and image alt text contain zero em dashes, using a pipe (`|`) for page title brand separation and standard punctuation elsewhere

#### Scenario: Visible page copy and tables
- **WHEN** a visitor reads headings, paragraphs, list items, or configuration reference tables on any marketing website page
- **THEN** zero em dashes appear anywhere in the rendered text, with empty configuration defaults rendered as `(none)` rather than an em dash

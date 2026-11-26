# Spec Delta

## ADDED Requirements

### Requirement: Brand name capitalization
The website SHALL render the brand name in lowercase as `itemized` everywhere—including the header and footer wordmark/logo, Open Graph card, page titles, structured data, and body copy—except when `Itemized` is the first word of a sentence.

#### Scenario: Logo, wordmark, and metadata
- **WHEN** a visitor or crawler loads any page or Open Graph preview
- **THEN** the header brand wordmark, footer brand wordmark, footer copyright line, page `<title>` brand name, `og:site_name`, JSON-LD brand `name`, and `og-card.png` display `itemized` in lowercase

#### Scenario: Prose copy capitalization
- **WHEN** a visitor reads headings, descriptions, or body paragraphs on any page
- **THEN** `itemized` appears in lowercase everywhere mid-sentence or in titles/labels, and `Itemized` is capitalized only when it starts a sentence

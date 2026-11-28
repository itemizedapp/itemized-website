## ADDED Requirements

### Requirement: Uniform borders on rounded boxes
Rounded boxes (including `.callout`, `.callout-warn`, cards, and notice containers) SHALL use uniform 4-sided borders and SHALL NOT apply a colored accent border to only one side (such as a thick colored `border-left` stripe on a rounded box).

#### Scenario: Viewing standard and warning callouts
- **WHEN** a visitor views a standard `.callout` or warning `.callout-warn` box on `/configuration/`, `/self-host/`, or `/install/` in light or dark mode
- **THEN** the box renders with a uniform 1px border around all four sides using its semantic border token (`--border-strong` for `.callout`, `--it-warn-border` for `.callout-warn`) and subtle surface fill, with no thicker or differently colored single-side accent stripe

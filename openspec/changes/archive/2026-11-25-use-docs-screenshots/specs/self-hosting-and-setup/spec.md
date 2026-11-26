# Spec Delta

## MODIFIED Requirements

### Requirement: Mobile PWA and Install page
The Install page (`/install/`) SHALL guide users through installing Itemized as a Progressive Web App on iOS, Android, and desktop browsers, showcase the installed mobile interface using the docs-sourced mobile screenshot, and explain mobile camera scanning prerequisites.

#### Scenario: Installing on iOS, Android, or desktop
- **WHEN** a visitor opens `/install/`
- **THEN** the page provides clear step-by-step instructions for adding Itemized to the home screen from iOS Safari, Android Chrome, and desktop Chromium/Edge browsers, plus a note that USB and Bluetooth barcode scanners work directly on desktop and mobile in the Scan / Action view

#### Scenario: Previewing the mobile PWA interface
- **WHEN** a visitor views `/install/`
- **THEN** the page renders a framed, captioned portrait preview of the mobile interface sourced from `/docs/assets/mobile-pwa.png` with descriptive alt text, explicit intrinsic dimensions, lazy loading, and a constrained portrait width so it displays cleanly without distorting layout across mobile, tablet, and desktop viewports

#### Scenario: Explaining HTTPS prerequisite for camera scanning
- **WHEN** a mobile user checks camera barcode scanning requirements on `/install/`
- **THEN** the page prominently states that HTTPS is required for live camera barcode scanning on mobile browsers and links directly to the HTTPS reverse proxy section on `/self-host/`

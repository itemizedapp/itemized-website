## ADDED Requirements

### Requirement: Configuration and Universal Label Printing reference page
The Configuration page (`/configuration/`) SHALL document all supported environment variables, OIDC SSO options, optional LLM UPC normalization settings, demo mode settings, and universal label printing setup including all supported printer drivers, label sizing, product label modes, and the Visual Label Designer.

#### Scenario: Environment variable reference
- **WHEN** an administrator visits `/configuration/`
- **THEN** a structured reference table lists every documented variable (`PORT`, `DB_PATH`, `PUID`, `PGID`, `BASE_URL`, `TRUST_PROXY`, `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_AUTO_PROVISION`, `OIDC_FORCE`, `LLM_PROVIDER`, `LLM_MODEL`, `LLM_BASE_URL`, `LLM_API_KEY`, `DEMO_MODE`, `DEMO_RESET_INTERVAL`) with defaults and descriptions, noting which settings can also be edited in the in-app Settings UI

#### Scenario: Universal label printing drivers reference
- **WHEN** a user evaluates which label printer to buy or connect on `/configuration/#printing`
- **THEN** the page presents all 6 supported printer drivers with endpoints and example hardware, with no companion print server required:
  - **Browser Print / PDF (Local Printer)**: exact-size single- and multi-page PDFs (one label per page) opened directly in the browser for manual prints, bulk reprints, Purchase / Quick Add, and due-date reprints, requiring no network printer
  - **Zebra / ZPL Compatible (Raw TCP `:9100`)**: direct ZPL over LAN (such as ZD411, ZD421, ZD621, networked ZD220/ZD230, legacy GK420d/GX420d, ZT231)
  - **Brother QL (TCP `:9100`)**: direct raster printing over LAN (QL-720NW, QL-810W, QL-820NWB)
  - **Rollo / Munbyn / TSC / iDPRT (TSPL `:9100`)**: direct TSPL2 printing over LAN
  - **CUPS / AirPrint / IPP Everywhere (IPP PDF)**: AirPrint printers and USB thermal printers (DYMO, Rollo, Munbyn, Brother QL-800) shared via CUPS
  - **Zebra ZSB Series (IPP ZPL)**: direct IPP printing (`ZSB-DP12`, `ZSB-DP14`) with an external link to `https://www.zebra.com/content/smb/us/en.html`
- **AND** clarifies that printing labels is optional because items can also be tracked using their existing retail UPC barcodes

#### Scenario: Visual Label Designer, label sizes, and product label modes
- **WHEN** a user reads the label customization documentation on `/configuration/#printing`
- **THEN** the page explains:
  - Server-side printer-agnostic rendering supporting IPP roll-size auto-detection, built-in label presets (such as `2.25" x 1.25"` and Brother `DK-1209 62 x 29 mm`), and custom dimensions in `mm` or `in` with configurable DPI and die-cut or continuous media
  - The **Visual Label Designer** for **item**, **product**, and **location** templates using a **3x3 anchor grid** (`Top Left` through `Bottom Right`), per-field text alignment, font size, bold, and icons, a **Live Preview** switcher across configured printers and label sizes, and one-click reset to default
  - Per-product **Label Modes** (`none`, `per_item` encoding `/go/i/:id`, and `per_product` encoding `/go/p/:id`)
  - Setting `BASE_URL` to your HTTPS address so printed QR labels open the native-camera QR Quick Action screen reliably

## MODIFIED Requirements

### Requirement: Self-Host Quick Start page
The Self-Host page (`/self-host/`) SHALL provide copy-ready deployment instructions for Docker Compose, Docker Run, and Unraid Community Apps, along with HTTPS reverse proxy guidance.

#### Scenario: Deploying with Docker Compose or Docker Run
- **WHEN** a self-hoster visits `/self-host/`
- **THEN** the page displays the official `ghcr.io/itemizedapp/itemized:latest` image, a complete `docker-compose.yml` snippet and `docker run` command (mapping port `8080`, `/data` volume, `BASE_URL`, `TRUST_PROXY`, `TZ`), notes multi-arch (`linux/amd64`, `linux/arm64`) support, and explains first-run administrator setup

#### Scenario: Deploying on Unraid
- **WHEN** an Unraid user reads the Unraid section on `/self-host/`
- **THEN** the page links to the official `https://github.com/itemizedapp/itemized-unraid` repository, explains `PUID:PGID` (`99:100` / `nobody:users`) automatic `/data` ownership handling, and notes that bridge networking reaches LAN label printers directly over TCP `:9100` and IPP `:631`

#### Scenario: HTTPS reverse proxy requirement
- **WHEN** a user reviews the HTTPS section on `/self-host/`
- **THEN** the page clearly explains that mobile browsers require HTTPS for live camera barcode scanning and Web Push notifications, lists common reverse proxies (Nginx Proxy Manager, Caddy, Traefik, SWAG, Tailscale Serve), and highlights setting `TRUST_PROXY=true` and `BASE_URL=https://...`

### Requirement: Mobile PWA and Install page
The Install page (`/install/`) SHALL guide users through installing itemized as a Progressive Web App on iOS, Android, and desktop browsers, showcase the installed mobile interface using the docs-sourced mobile screenshot, and explain HTTPS and Home Screen prerequisites for camera scanning and Web Push notifications.

#### Scenario: Installing on iOS, Android, or desktop
- **WHEN** a visitor opens `/install/`
- **THEN** the page provides clear step-by-step instructions for adding itemized to the home screen from iOS Safari, Android Chrome, and desktop Chromium/Edge browsers, plus a note that USB and Bluetooth barcode scanners work directly on desktop and mobile in the Scan / Action view

#### Scenario: Previewing the mobile PWA interface
- **WHEN** a visitor views `/install/`
- **THEN** the page renders a framed, captioned portrait preview of the mobile interface sourced from `/docs/assets/mobile-pwa.png` with descriptive alt text, explicit intrinsic dimensions, lazy loading, and a constrained portrait width so it displays cleanly without distorting layout across mobile, tablet, and desktop viewports

#### Scenario: Explaining HTTPS prerequisite for camera scanning
- **WHEN** a mobile user checks camera barcode scanning and notification requirements on `/install/`
- **THEN** the page prominently states that HTTPS is required for live camera barcode scanning and Web Push daily digest notifications on mobile browsers, and links directly to the HTTPS reverse proxy section on `/self-host/`

#### Scenario: Explaining iOS Home Screen prerequisite for Web Push notifications
- **WHEN** an iOS user reviews PWA installation on `/install/`
- **THEN** the page notes that iOS requires adding itemized to the Home Screen and launching it from that icon before enabling Web Push daily digest notifications

## REMOVED Requirements

### Requirement: Configuration and Label Printing reference page
**Reason**: Replaced by `Configuration and Universal Label Printing reference page`, which covers all 6 multi-vendor and browser PDF printer drivers and the Visual Label Designer instead of Zebra-only ZPL and Go-template ZPL layouts.
**Migration**: Use `Configuration and Universal Label Printing reference page` for `/configuration/` verification.

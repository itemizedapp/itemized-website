# self-hosting-and-setup Specification

## Purpose

Defines the Self-Host Quick Start (`/self-host/`), Configuration & Printing (`/configuration/`), and Mobile PWA Install (`/install/`) pages so users can deploy, configure, and use Itemized reliably on their own network.

## Requirements

### Requirement: Self-Host Quick Start page
The Self-Host page (`/self-host/`) SHALL provide copy-ready deployment instructions for Docker Compose, Docker Run, and Unraid Community Apps, along with HTTPS reverse proxy guidance.

#### Scenario: Deploying with Docker Compose or Docker Run
- **WHEN** a self-hoster visits `/self-host/`
- **THEN** the page displays the official `ghcr.io/itemizedapp/itemized:latest` image, a complete `docker-compose.yml` snippet and `docker run` command (mapping port `8080`, `/data` volume, `BASE_URL`, `TRUST_PROXY`, `TZ`), notes multi-arch (`linux/amd64`, `linux/arm64`) support, and explains first-run administrator setup

#### Scenario: Deploying on Unraid
- **WHEN** an Unraid user reads the Unraid section on `/self-host/`
- **THEN** the page links to the official `unraid/itemized.xml` template, explains `PUID:PGID` (`99:100` / `nobody:users`) automatic `/data` ownership handling, and notes that bridge networking reaches LAN printers directly

#### Scenario: HTTPS reverse proxy requirement
- **WHEN** a user reviews the HTTPS section on `/self-host/`
- **THEN** the page clearly explains that mobile browsers disable camera APIs on plain `http://` LAN URLs, lists common reverse proxies (Nginx Proxy Manager, Caddy, Traefik, SWAG, Tailscale Serve), and highlights setting `TRUST_PROXY=true` and `BASE_URL=https://...`

### Requirement: Configuration and Label Printing reference page
The Configuration page (`/configuration/`) SHALL document all supported environment variables, OIDC SSO options, optional LLM UPC normalization settings, demo mode settings, and direct LAN Zebra label printing setup.

#### Scenario: Environment variable reference
- **WHEN** an administrator visits `/configuration/`
- **THEN** a structured reference table lists every documented variable (`PORT`, `DB_PATH`, `PUID`, `PGID`, `BASE_URL`, `TRUST_PROXY`, `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_AUTO_PROVISION`, `OIDC_FORCE`, `LLM_PROVIDER`, `LLM_MODEL`, `LLM_BASE_URL`, `LLM_API_KEY`, `DEMO_MODE`, `DEMO_RESET_INTERVAL`) with defaults and descriptions, noting which settings can also be edited in the in-app Settings UI

#### Scenario: Direct LAN Zebra label printing guide
- **WHEN** a user looks up label printing on `/configuration/`
- **THEN** the page explains both supported direct LAN protocols—Zebra ZSB via IPP (`http://<printer-ip>:631/ipp/print`) and Raw TCP ZPL (`<printer-ip>:9100`)—along with customizable Go-template ZPL layouts for items, products, and locations, and notes that no companion print server is required

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

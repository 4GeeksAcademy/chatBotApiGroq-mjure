---
name: Azure Logic
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444651'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#516070'
  on-secondary: '#ffffff'
  secondary-container: '#d5e4f8'
  on-secondary-container: '#576676'
  tertiary: '#1b2b3f'
  on-tertiary: '#ffffff'
  tertiary-container: '#314156'
  on-tertiary-container: '#9dadc6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#d5e4f8'
  secondary-fixed-dim: '#b9c8db'
  on-secondary-fixed: '#0e1d2b'
  on-secondary-fixed-variant: '#3a4858'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 1.5rem
  margin-mobile: 1rem
  stack-xs: 0.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style

This design system centers on a **Modern Professional** aesthetic, specifically tailored for high-stakes communication and AI-driven workflows. The personality is efficient, calm, and highly organized, evoking a sense of reliability and clarity.

The style leans heavily into **Minimalism** with a touch of **Soft UI**. By utilizing generous whitespace and a restricted color palette, the interface minimizes cognitive load, allowing the user to focus entirely on the conversation flow. Depth is communicated through light-diffusion shadows rather than heavy borders, creating a sophisticated, layered environment that feels premium and institutional.

## Colors

The palette is anchored by **Deep Azure (#1E3A8A)**, representing authority and stability. This is used for primary actions, branding elements, and active states. 

- **Backgrounds:** The application uses a very soft gray `neutral` for the main workspace to reduce eye strain.
- **Message Bubbles:** A distinct contrast is created between the system (White) and the user (Light Blue/`secondary`). 
- **Data Tokens:** AI consumption and data metrics use the `tertiary` slate gray for a technical, unobtrusive feel, with success/warning accents for usage limits.

## Typography

The design system utilizes **Hanken Grotesk** across all levels. This typeface offers a precise, contemporary geometric feel that aligns with the professional narrative. 

- **Headlines:** Use tighter letter spacing and heavier weights to establish clear hierarchy.
- **Body Text:** Set with generous line heights to ensure long-form AI responses remain highly legible.
- **Labels:** Used for metadata like "Tokens Used" or "Timestamp," often set in uppercase with slight tracking to differentiate from conversational text.

## Layout & Spacing

The layout follows a **Fluid Grid** within a max-width container for desktop, ensuring the chat interface doesn't become overly wide on ultra-wide monitors. 

- **Chat Feed:** Content is centered with a max-width of 800px to maintain an optimal line length for reading.
- **Sidebar:** A collapsible side panel (280px) houses conversation history and token metrics.
- **Mobile:** Margins shrink to 16px. The input area is pinned to the bottom of the viewport with a blurred background to maintain context behind the glass.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Ambient Shadows**. 

1. **Base Layer:** The soft gray background (`#F9FAFB`).
2. **Mid Layer (Cards/Bubbles):** White or Light Blue surfaces with a very soft, high-diffusion shadow (`Y: 2, Blur: 8, Opacity: 0.04`) to lift them slightly off the base.
3. **Top Layer (Modals/Popovers):** Higher elevation with a more pronounced shadow (`Y: 10, Blur: 20, Opacity: 0.08`) and a 1px subtle border in a slightly darker neutral to define edges.

## Shapes

The design system employs a **Rounded** corner strategy. This softens the professional tone, making the tool feel more accessible and user-friendly.

- **Message Bubbles:** 0.5rem (8px) as the standard, but use 1rem (16px) for the outer corners to create a distinctive "bubble" look.
- **Inputs & Buttons:** Maintain a consistent 0.5rem radius to align with the grid.
- **Token Badges:** Use a full pill-shape (round-xl) to distinguish them as discrete data units.

## Components

### Message Bubbles
- **System/AI:** White background, Slate-700 text, aligned left. Subtle shadow.
- **User:** Light Blue (`secondary`) background, Deep Azure (`primary`) text, aligned right. No shadow, 1px border of a darker blue shade.

### Token Usage Indicator
- A small, pill-shaped badge located at the top-right of the chat or within the input field. 
- **Style:** Light gray background with a small progress ring or bar showing percentage of context window used.

### Buttons
- **Primary:** Deep Azure background with white text. High contrast.
- **Ghost:** No background, Deep Azure border and text for secondary actions like "Clear Chat."

### Input Field
- A multi-line auto-expanding textarea. 
- **Style:** White background, 1px subtle border, with the "Send" button floating inside the right-hand side of the container as a primary-colored icon button.

### Lists (Chat History)
- Clean, no-border items. Hover states use a slightly darker neutral shade. Active conversation is marked with a 4px vertical "Deep Azure" bar on the left edge.
# Color Palette Generator Forge

A modern web app for generating, editing, and exporting color palettes and themes. Built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- Generate beautiful color palettes
- Edit colors and tokens visually
- Export palettes as Tailwind config or CSS variables
- Live theme preview (buttons, cards, inputs, badges, alerts)
- Gradient generator and contrast checker
- Mobile-friendly, responsive UI
- Modular codebase with feature-based components

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

App runs at `http://localhost:3000`

### Build

```bash
pnpm build
```

## Project Structure

```
components/
  common/         # Shared UI (header, navigation)
  gradient/       # Gradient generator components
  palette/        # Palette generator components
  theme/          # Theme editor components (preset-selector, color-tokens-editor, etc)
  ui/             # UI primitives (button, input, slider)
lib/              # Utility functions (color-utils, theme-utils, contrast-utils)
app/              # Next.js app routes and pages
```

## Contributing

Pull requests and issues welcome! Please follow the code style and naming conventions (kebab-case for components).

## License

MIT

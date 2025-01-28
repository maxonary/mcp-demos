# 10 Advanced Tailwind Tricks from Shadcn

> A collection of powerful Tailwind CSS techniques to enhance your React
> components, inspired by Shadcn.

📺 [Watch the Tutorial](https://youtu.be/9z2Ifq-OPEI)

## Key Features

- Dynamic CSS Variable Control
- Data Attribute State Management
- Nested SVG Parent States
- Parent-Child Style Inheritance
- Group-Based State Management
- Data Slots for Hover Interactions
- Peer Element State Control
- Named Group Focus States
- Cross-Component State Sharing
- Variant-Based Prop Styling

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Radix UI Components
- Lucide React Icons

### Development Tools

- Vite
- TypeScript
- @react-router/dev
- shadcn/ui CLI

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## Project Structure

```
10-tailwind-tricks/
├── README.md
├── app/
│   ├── app.css               # Global styles
│   ├── root.tsx             # Root layout
│   ├── routes.ts            # Route definitions
│   │
│   ├── components/          # Shared components
│   │   ├── example.tsx      # Example wrapper
│   │   └── ui/             # UI components
│   │
│   └── routes/             # Individual examples
│       ├── home.tsx
│       └── [01-10]*.tsx    # Technique examples
│
├── public/                  # Static assets
├── components.json         # shadcn/ui config
├── package.json
└── tailwind.config.ts
```

## Techniques Overview

1. **Dynamic Width with CSS Variables** Use CSS variables in your styles prop to
   control component widths with React state.

2. **Data Attribute Styling** Toggle styles with data attributes to manage
   dynamic states and transitions.

3. **Nested SVG Parent Data States** Control nested SVG elements through parent
   data states for smooth icon animations.

4. **Parent-Child Style Inheritance** Pass styles from parent to child elements
   using advanced selector patterns.

5. **Group-Based State Management** Manage multiple elements' states through a
   single parent group modifier.

6. **Data Slots Hover Interactions** Create interactive hover effects using data
   slots for dynamic UI elements.

7. **Peer Element State Control** Style elements based on their siblings' states
   using peer modifiers.

8. **Named Group Focus States** Handle focus states across grouped elements with
   named modifiers.

9. **Cross-Component State Sharing** Share state between components using group
   data attributes.

10. **Variant-Based Prop Styling** Apply styles conditionally based on component
    props and variants.

## Development Workflow

1. Each technique has its own route and component
2. Examples include:
   - Live demo
   - Source code
   - Explanation
   - Interactive elements

## Contributing

Found a bug or want to add another technique? Feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

## Acknowledgments

Special thanks to [Shadcn](https://twitter.com/shadcn) for inspiring these
techniques and creating the amazing shadcn/ui library.

# Wady Wholesale B2B Marketplace

Wady is a modern B2B marketplace platform connecting wholesalers and retailers in the MENA region. Built with Next.js, the platform provides a seamless experience for business transactions, inventory management, and order processing.

## Git Workflow

We follow a rebase workflow to maintain a clean and linear git history:

1. Create a feature branch from `main`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Keep your branch up to date with main

   ```bash
   git fetch origin
   git rebase origin/main
   ```

3. Push your changes

   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request to merge into `main`

We use Husky for pre-commit hooks to ensure code quality:

### Packages & Configurations

- Prettier: Code formatting and style consistency
- ESLint: JavaScript/TypeScript linting and code quality checks
- TypeScript: Static type checking and type safety
- Jest & Testing Library: Unit test execution and validation
- Husky: Git hooks for pre-commit checks
- Commitlint: Commit message format validation
- TailwindCSS & shadcn/ui: Utility-first CSS and accessible UI components
- Zustand: Lightweight state management solution
- Zod: TypeScript-first schema validation and form handling
- next-intl: Internationalization and localization support

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

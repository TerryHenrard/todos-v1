# GitHub Copilot Instructions - TodoApp V1

## Project Overview

This application is a **modern todo app** built with Next.js 15, TypeScript, and a modern tech stack including authentication, PostgreSQL database, and an elegant user interface.

## Main Tech Stack

### Frontend

- **Next.js 15** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** with modern configuration (PostCSS)
- **shadcn/ui** with "new-york" style and Radix UI components
- **Lucide React** for icons
- **React Query (TanStack Query)** for client-side data management

### Backend & Database

- **Drizzle ORM** with PostgreSQL adapter
- **Neon Database** (serverless PostgreSQL)
- **Better Auth** for complete authentication
- **Zod** for schema validation

### UI/UX & Styling

- **Design system** based on shadcn/ui with custom variants
- **Collapsible sidebar** with variants (floating, icon, inset)
- **Dark/light theme** with next-themes
- **Animations** with Tailwind and CSS custom properties
- **Responsive design** with mobile-first approach

## Project Architecture

### Folder Structure

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (auth)/            # Auth route group
│   ├── dashboard/         # Main user interface
│   └── api/auth/          # API routes for auth
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── landing-page/      # Landing page sections
│   └── layout/            # Layout components
├── db/                    # Drizzle configuration
├── lib/                   # Utilities and configurations
└── hooks/                 # Custom React hooks
```

### Database Schema

- **users**: Users with email, name, image, dates
- **sessions**: User sessions with tokens and metadata
- **accounts**: External accounts (OAuth)
- **verifications**: Email verification codes

## Code Conventions

### React Components

- Use **named functions** rather than arrow functions for main components
- **"use client"** only when necessary (hooks, events, state)
- Prefer **React Server Components** by default
- Types with **React.ComponentProps<'element'>** for extension

### Styling

- Tailwind classes with **cn()** utility for conditional merging
- **data-slot** attributes for all UI components
- CSS custom variables for themes and dimensions
- **Responsive design** with sm:, md:, lg: prefixes

### Authentication

- **Better Auth** with Drizzle adapter
- **Server-side sessions** with `getSession()` in server-utils
- **Client-side sessions** with authClient and React Query
- Middleware for route protection

### Database

- **Drizzle ORM** with typed schema
- **Migrations** with drizzle-kit
- **Seeding** with Faker.js for test data

## Specific Patterns

### UI Components (shadcn/ui style)

```typescript
// Always include data-slot for identification
function Component({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="component-name"
      className={cn("base-classes", className)}
      {...props}
    />
  )
}
```

### Sidebar with variants

```typescript
// Use predefined variants
<Sidebar variant="floating" collapsible="icon">
  <SidebarContent>
    <SidebarGroup>
      {/* Content */}
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

### Authentication

```typescript
// Server-side
const session = await getSession();
if (!session) redirect('/sign-in');

// Client-side
const { data: session } = useQuery({
  queryKey: ['session'],
  queryFn: () => authClient.getSession(),
});
```

## Development Environment

### Available Scripts

- `npm run dev`: Development with Turbopack
- `npm run build`: Production build
- `npm run lint`: Linting with ESLint
- `npm run seed`: Database seeding

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL URL (Neon)
- `GITHUB_CLIENT_ID`: GitHub OAuth
- `GITHUB_CLIENT_SECRET`: GitHub OAuth

## Development Guidelines

### Performance

- Use **React Server Components** by default
- **Lazy loading** for non-critical components
- **Image optimization** with next/image
- **Bundle splitting** automatic with Next.js

### Accessibility

- **Semantic labels** with sr-only classes
- **Focus management** with outline-hidden and focus-visible
- **ARIA attributes** on interactive components
- **Keyboard navigation** natively supported

### SEO & Meta

- **Metadata API** from Next.js 15
- **Open Graph** appropriate tags
- **Structured data** when applicable

### Testing (recommendations)

- **Jest** + **Testing Library** for unit tests
- **Playwright** for E2E tests
- **MSW** for mocking API calls

## Important Dependencies

### Production

- `next@15.3.2` - React Framework
- `better-auth@^1.2.8` - Authentication
- `drizzle-orm@^0.43.1` - TypeScript ORM
- `@tanstack/react-query@^5.76.2` - State management
- `tailwind-merge@^3.3.0` - Utility classes merging
- `zod@^3.25.20` - Schema validation

### Development

- `drizzle-kit@^0.31.1` - DB Migrations
- `@tailwindcss/postcss@^4` - CSS processing
- `typescript@^5` - TypeScript support
- `prettier@^3.5.3` - Code formatting

## Specific Best Practices

1. **Always type** component props
2. **Use cn()** to merge Tailwind classes
3. **Server Components** by default, Client Components when necessary
4. **Route protection** with middleware and redirections
5. **Validation** with Zod for all user inputs
6. **Error handling** consistent with try/catch and error boundaries
7. **Loading states** with Suspense and skeletons
8. **Optimistic updates** with React Query mutations

## Useful Commands

```bash
# Development
npm run dev

# Database
npx drizzle-kit generate
npx drizzle-kit migrate
npm run seed

# Linting and formatting
npm run lint
npx prettier --write .

# Build and deployment
npm run build
npm start
```

This modern configuration prioritizes performance, accessibility and developer experience while maintaining a maintainable and scalable codebase.


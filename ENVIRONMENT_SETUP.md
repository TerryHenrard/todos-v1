# Environment Variables Guide

This guide explains how to properly configure environment variables for the TodoApp V1 project across different environments.

## File Structure and Priority

Next.js loads environment variables in this order (highest to lowest priority):

1. `.env.local` - Local overrides (never committed)
2. `.env.production` - Production environment
3. `.env.development` - Development environment
4. `.env.test` - Test environment
5. `.env` - Default fallback (usually not used)

## File Purposes

### `.env.example`

- Template file showing required environment variables
- Safe to commit to git
- Used by team members to set up their local environment

### `.env.development`

- Contains development-specific values
- Uses localhost URLs and development database
- Safe to commit (no sensitive production data)

### `.env.production`

- Contains production-specific values
- Uses production URLs and database
- Can be committed if values are not sensitive
- Often contains placeholder values

### `.env.local`

- Highest priority - overrides all other files
- Never committed to git
- Used for local development secrets and personal overrides

## Setup Instructions

### For New Developers

1. Copy `.env.example` to `.env.local`:

   ```bash
   copy .env.example .env.local
   ```

2. Fill in the actual values in `.env.local`

3. The project will automatically use `.env.development` for development

### For Production Deployment

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Or use `.env.production` values as reference

## Environment-Specific Configuration

### Development (`npm run dev`)

- Uses `.env.development` automatically
- `BETTER_AUTH_URL=http://localhost:3000`
- Development database connection
- Development OAuth app credentials

### Production (`npm run build && npm start`)

- Uses `.env.production` automatically
- `BETTER_AUTH_URL=https://your-domain.com`
- Production database connection
- Production OAuth app credentials

## Security Best Practices

### Never Commit These Files:

- `.env` (contains real secrets)
- `.env.local` (personal overrides)
- `.env.*.local` (local environment overrides)

### Safe to Commit:

- `.env.example` (template with no real values)
- `.env.development` (development values, no production secrets)
- `.env.production` (if using placeholder values)

### Platform Environment Variables

For production deployments, set these in your hosting platform:

**Vercel:**

```bash
vercel env add BETTER_AUTH_SECRET production
vercel env add BETTER_AUTH_URL production
vercel env add DATABASE_URL production
vercel env add GITHUB_CLIENT_ID production
vercel env add GITHUB_CLIENT_SECRET production
```

**Netlify:**
Set in Site settings > Environment variables

## Variable Types

### Server-side Only (default)

```bash
DATABASE_URL=postgres://...
BETTER_AUTH_SECRET=secret123
GITHUB_CLIENT_SECRET=secret456
```

### Client-side (public)

```bash
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_API_URL=https://api.myapp.com
```

**Note:** `NEXT_PUBLIC_` variables are exposed to the browser!

## Troubleshooting

### Variables Not Loading

1. Check file naming (must be exact: `.env.development`)
2. Restart Next.js development server
3. Verify file is in project root
4. Check for syntax errors (no spaces around `=`)

### Wrong Environment Values

1. Check `NODE_ENV` value
2. Verify file priority order
3. Use `console.log(process.env.VARIABLE_NAME)` to debug

### Production Issues

1. Ensure production variables are set in hosting platform
2. Check that `BETTER_AUTH_URL` matches your domain
3. Verify database URL is accessible from production environment

## Example Workflow

1. **Initial Setup:**

   ```bash
   copy .env.example .env.local
   # Edit .env.local with your values
   npm run dev
   ```

2. **Adding New Variable:**

   - Add to `.env.example` as template
   - Add to `.env.development` with dev value
   - Add to `.env.production` with production value
   - Set in hosting platform for production

3. **Local Override:**
   - Add variable to `.env.local` to override any environment


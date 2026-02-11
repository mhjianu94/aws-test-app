# Next.js AWS Amplify Deployment

A Next.js frontend-only application configured for static export and deployed to AWS Amplify Hosting.

## Features

- ⚡ Next.js 14 with App Router
- 📦 Static export configuration
- 🚀 AWS Amplify Hosting deployment
- 🎨 Modern, responsive UI
- 📝 TypeScript support

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

4. **Build for production:**
   ```bash
   npm run build
   ```
   
   The static export will be generated in the `out/` directory.

## Deployment

The app is configured to deploy to AWS Amplify Hosting.

### AWS Amplify Deployment

The frontend is built as a static export and deployed to Amplify Hosting automatically when you push to your connected branch.

The `amplify.yml` file is configured to:
- Install dependencies
- Build the Next.js static export
- Deploy the `out/` directory to Amplify Hosting

### Manual Deployment

1. Connect your repository to AWS Amplify Console
2. Amplify will automatically detect the `amplify.yml` configuration
3. Push to your main branch to trigger automatic deployment

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
├── amplify.yml            # Amplify deployment configuration
├── next.config.js         # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration

### Next.js Config

The app is configured for static export in `next.config.js`:
- `output: 'export'` - Enables static export
- `images.unoptimized: true` - Required for static export

This configuration makes the app perfect for static hosting on AWS Amplify.

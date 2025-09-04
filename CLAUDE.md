# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PERSCOM Widget - a JavaScript widget for embedding PERSCOM.io functionality into external websites. The widget creates an iframe that loads PERSCOM data and automatically resizes itself using iframe-resizer.

## Architecture

The project is a single-file JavaScript widget (`widget.js`) that:

1. **Widget Class**: Core functionality in a `Widget` class that handles initialization, iframe creation, and navigation
2. **Iframe Integration**: Creates a sandboxed iframe that loads PERSCOM widget content from the API
3. **Auto-resizing**: Uses iframe-resizer library to automatically adjust iframe height based on content
4. **Message Communication**: Listens for postMessage events to handle navigation between widget pages
5. **Environment Configuration**: Uses environment variables for API URLs and configuration

### Key Files

- `widget.js` - Main widget implementation (entry point)
- `webpack.config.js` - Build configuration for bundling
- `public/index.html` - Development test page with example widget integration
- `.env.example` - Environment configuration template

### Widget Integration

Websites embed the widget using this HTML pattern:
```html
<div id="perscom_widget_wrapper">
    <script
        id="perscom_widget"
        data-apikey="YOUR_API_KEY"
        data-widget="roster"
        data-dark="false"
        src="https://widget.perscom.io/widget.js">
    </script>
</div>
```

## Development Commands

- `npm run dev` - Start development server with webpack dev server
- `npm run build` - Build production bundle to `dist/widget.js`
- `npm run format` - Format code with Prettier
- `npm test` - Run Jest tests
- `npm test:watch` - Run tests in watch mode
- `npm test:ci` - Run tests for CI

## Build Process

The widget is built using webpack and deployed to AWS S3/CloudFront. The build process:
1. Bundles `widget.js` as entry point using webpack
2. Applies Babel transformation for browser compatibility
3. In production, minifies and removes console statements
4. Injects environment variables via webpack.DefinePlugin

## Environment Variables

- `API_URL` - Base URL for PERSCOM widget API (defaults to `https://api.perscom.test/v2/widgets/`)
- `NODE_ENV` - Environment mode (development/production)
- Sentry configuration (DSN, ORG, PROJECT, AUTH_TOKEN)

## Code Style

- Uses Prettier with single quotes, 2-space tabs, 100 character line width
- Includes plugins for import organization and Tailwind CSS sorting
- No linting configuration present in package.json scripts

## Testing

- Jest configuration with jsdom environment for DOM testing
- Setup file: `jest.setup.js`
- Test files should follow standard Jest patterns

## Widget API Integration

The widget communicates with PERSCOM's widget API endpoints:
- Constructs URLs by appending widget type to base API URL
- Passes API key as query parameter
- Supports dark mode toggle via query parameter
- Handles different widget types: roster, calendar, forms, newsfeed, etc.
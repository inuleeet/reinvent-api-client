# As User Sees It

A lightweight, no-frills HTTP REST API client for local testing and development.

## Overview

This project is a minimalist API client that focuses solely on executing HTTP REST API methods without the bloat of comprehensive tools like Postman. It's designed for developers who need a quick, simple way to test API endpoints during development.

## Features

- **Lightweight**: No unnecessary features or bloat
- **Core HTTP Methods**: Support for GET, POST, PUT, DELETE, PATCH
- **Local Only**: Runs completely on your local machine
- **Fast Startup**: Minimal initialization time
- **Simple Interface**: Focused on request/response without distractions

## Why Another API Client?

While tools like Postman offer comprehensive features, they can be resource-intensive and include many features you may not need. This client focuses on doing one thing well: executing HTTP requests quickly and displaying responses clearly.

## Tech Stack

- **Nuxt**: Provides the application framework
- **Vue**: Powers the simple UI components
- **Bun**: Offers a fast JavaScript runtime environment
- **TypeScript**: Ensures type safety

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Bun runtime (for optimal performance)

### Installation

```terminal
bunx gitpick xcvzmoon/as-user-sees-it
cd as-user-sees-it
bun install
bun run dev --o
```

## Usage

1. Select your HTTP method from the dropdown
2. Enter the request URL
3. Add headers if needed
4. Add request body for GET/POST/PUT/PATCH/DELETE methods
5. Click button to execute
6. View the response and status code

## Project Status

This is a personal project created to fulfill a specific need for a no-frills API testing tool. It's intentionally minimal and may not receive extensive feature updates.

## License

MIT License

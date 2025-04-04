# Simple Local API Client

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

1. Clone this repository:

```bash
git clone https://github.com/xcvzmoon/api-client.git
```

2. Change to the project directory:

```bash
cd simple-api-client
```

3. Install dependencies:

```bash
bun install
```

4. Start the application:

```bash
bun run dev
```

5. Open your browser to `http://localhost:3000`

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

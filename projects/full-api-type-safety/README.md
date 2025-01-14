# Full API Type Safety with OpenAPI-Fetch

This project demonstrates how to implement complete type safety between a
FastAPI backend and React frontend using OpenAPI-Fetch. Say goodbye to the `any`
type and manual interface definitions when working with APIs!

📺 [Watch the Full Tutorial](https://youtube.com/@bitswired)

## Key Features

- Automatic TypeScript type generation from OpenAPI specifications
- Type-safe API client with runtime validation
- Zero manual type definitions
- Real-time type checking for API endpoints and responses
- Automatic type updates when the API changes
- Integration with React and TanStack Query
- Lightweight runtime (only 6kb!)

## Tech Stack

### Backend

- FastAPI
- Python
- Pydantic for data validation
- Automatic OpenAPI specification generation

### Frontend

- React
- TypeScript
- TanStack Query for data fetching
- OpenAPI-Fetch for type-safe API calls
- Vite for development and building

### Development Tools

- openapi-typescript for type generation
- curl for OpenAPI spec fetching
- npm scripts for automation

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- Python (v3.12 or later)
- pnpm (or npm/yarn)
- uv

### Backend Setup

1. Install backend dependencies with uv:

```bash
uv init
uv sync
```

2. Start the FastAPI server:

```bash
uv run pythton server.py
```

The API will be available at http://localhost:8000, and the OpenAPI
specification at http://localhost:8000/openapi.json.

### Frontend Setup

1. Install dependencies:

```bash
pnpm install
```

2. Generate TypeScript types from OpenAPI specification:

```bash
pnpm run openapi:refresh
```

4. Start the development server:

```bash
pnpm run dev
```

## Project Structure

```
full-api-type-safety/
├── README.md                  # Project documentation
│
├── api/                       # FastAPI Backend
│   ├── pyproject.toml        # Python dependencies and project metadata
│   ├── server.py             # FastAPI application code
│   └── uv.lock               # Lock file for Python dependencies
│
└── app/                      # React Frontend
    ├── README.md             # Frontend-specific documentation
    │
    ├── app/                  # Source code directory
    │   ├── app.css          # Global styles
    │   ├── root.tsx         # Root React component
    │   ├── routes.ts        # Route definitions
    │   │
    │   ├── lib/             # Shared utilities and services
    │   │   └── data/        # API integration
    │   │       ├── client.ts    # Type-safe API client
    │   │       └── openapi.ts   # Generated TypeScript types
    │   │
    │   └── routes/          # Application routes/pages
    │       └── home.tsx     # Home page component
    │
    ├── public/              # Static assets
    │   └── favicon.ico      # Site favicon
    │
    ├── openapi.json         # OpenAPI specification
    ├── openapi.ts           # OpenAPI type generation script
    │
    ├── package.json         # Frontend dependencies and scripts
    ├── pnpm-lock.yaml       # Lock file for Node.js dependencies
    │
    ├── react-router.config.ts   # Router configuration
    ├── tailwind.config.ts       # Tailwind CSS configuration
    ├── tsconfig.json            # TypeScript configuration
    └── vite.config.ts           # Vite build configuration
```

## Implementation Details

### API Client Setup

1. Install required packages:

```bash
pnpm install openapi-fetch
pnpm install -D openapi-typescript typescript
```

2. Add automation scripts to package.json:

```json
{
    "scripts": {
        "openapi:get": "curl http://localhost:8000/openapi.json > openapi.json",
        "openapi:create": "tsx openapi.ts ./openapi.json ./app/lib/data/openapi.ts",
        "openapi:refresh": "npm run openapi:get && npm run openapi:types"
    }
}
```

3. Create the type-safe client:

```typescript
import createClient from "openapi-fetch";
import type { paths } from "./openapi.ts";

export const client = createClient<paths>({
    baseUrl: "http://localhost:8000",
    credentials: "include",
});
```

### Type Safety Benefits

1. **URL Validation**: TypeScript catches typos in endpoint URLs

```typescript
// ❌ Error: '/todo' doesn't exist
client.GET("/todo");

// ✅ Correct: '/todos' exists
client.GET("/todos");
```

2. **Parameter Validation**: Required parameters are enforced

```typescript
// ❌ Error: missing required 'title' in body
client.POST("/todos", { body: {} });

// ✅ Correct: includes required 'title'
client.POST("/todos", { body: { title: "New Todo" } });
```

3. **Response Type Safety**: Access only existing properties

```typescript
const { data } = await client.GET("/todos");
// ❌ Error: 'description' doesn't exist on Todo type
console.log(data[0].description);

// ✅ Correct: 'title' exists on Todo type
console.log(data[0].title);
```

## Development Workflow

1. Make changes to FastAPI endpoints
2. Run `pnpm run openapi:refresh` to update types
3. TypeScript immediately shows any breaking changes
4. Update frontend code to match API changes

## Common Issues and Solutions

1. **CORS Issues**
   - Enable CORS in FastAPI using the CORSMiddleware
   - Ensure the frontend URL is in the allowed origins

2. **Type Generation Fails**
   - Verify the FastAPI server is running
   - Check if the OpenAPI JSON endpoint is accessible
   - Ensure all paths in the scripts are correct

3. **Runtime Errors**
   - Verify API base URL configuration
   - Ensure all required dependencies are installed

## Contributing

Found a bug or want to improve the code? Feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [OpenAPI-Fetch Documentation](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-fetch)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

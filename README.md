# Modern News Aggregator

A modern news aggregation application following Feature-Sliced Design (FSD) architecture.

## Tech Stack

### Frontend

- **React 19** - UI library with React Compiler optimization
- **TypeScript 5.5** - Type-safe development
- **Redux Toolkit 2.0** - State management with Redux Thunk for async operations
- **SCSS** - Modular styling with variables and mixins

### Build & Development

- **Vite 7** - Fast build tool and dev server
- **Babel React Compiler** - Experimental React optimization

### Code Quality

- **ESLint 9** - Code linting
- **Prettier 3.6** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Testing

- **Jest 29** - JavaScript testing framework
- **React Testing Library 16** - Component testing utilities
- **ts-jest** - TypeScript support for Jest
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction simulation

### Deployment

- **Docker** - Containerization
- **Nginx** - Production web server
- **Multi-stage builds** - Optimized production images

## Architecture

### Feature-Sliced Design (FSD)

```
src/
├── app/          # Application initialization & global styles
├── pages/        # Full page components
├── widgets/      # Compositional UI blocks (NewsFeed)
├── features/     # User interaction features (filters, article cards)
├── redux/        # State management (store, slices)
└── shared/       # Reusable UI components & utilities
```

### State Management

- **Redux Toolkit** with createSlice and createAsyncThunk
- **Redux Thunk** for async API calls
- **TypeScript** typed hooks and selectors
- **Local Storage** integration for favorites

### Styling Architecture

- **SCSS modules** organized by component
- **BEM methodology** for class naming
- **Mixins & variables** for consistent theming
- **Responsive breakpoints** (sm, md, lg, xl)

## API Integration

### News Sources

- **NewsAPI** - General news aggregation
- **The Guardian** - UK news content
- **The New York Times** - NYT articles

### Proxy Configuration

Development proxy in `vite.config.ts` handles CORS:

- `/api/newsapi` → NewsAPI
- `/api/guardian` → The Guardian API
- `/api/nyt` → NYT API

## Prerequisites

### Local Development

- Node.js v18+
- npm or yarn

### Docker Deployment

- Docker v20.10+
- Docker Compose v2.0+

## Quick Start

### Local Development

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # Production build
npm test           # Run unit tests
```

### Docker Production

```bash
npm run docker:prod    # http://localhost:3000
npm run docker:stop
npm run docker:clean
```

### Docker Development

```bash
npm run docker:dev     # http://localhost:5174 with hot reload
```

## Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GUARDIAN_API_KEY=your_guardian_key
VITE_NYT_API_KEY=your_nytimes_key
```

### Getting API Keys

1. **NewsAPI** - [https://newsapi.org/register](https://newsapi.org/register)
2. **The Guardian** - [https://open-platform.theguardian.com/access/](https://open-platform.theguardian.com/access/)
3. **NYT** - [https://developer.nytimes.com/get-started](https://developer.nytimes.com/get-started)

### Docker Environment Configuration

The Docker setup automatically loads environment variables from your `.env` file:

- **Production build**: API keys are baked into the build at compile time via ARG/ENV
- **Development mode**: Environment variables are passed to the container at runtime
- **docker-compose**: Automatically reads `.env` file from the project root

**Important**: The `.env` file is excluded from the Docker image via `.dockerignore` for security.

## Testing

### Test Coverage

The project includes comprehensive unit tests using **Jest** and **React Testing Library**:

- **13 test suites** with 57 tests
- **Component testing** - All UI components (Button, Select, Search, etc.)
- **Feature testing** - ArticleCard, NewsFilters, NewsFeed
- **Hook testing** - useDebounce with fake timers
- **Redux testing** - newsSlice reducers and actions
- **Integration testing** - Widget components with mocked dependencies

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

### Test Structure

Tests follow the `__tests__` convention alongside source files:

```
src/
├── shared/
│   ├── ui/
│   │   └── button/
│   │       ├── Button.tsx
│   │       └── __tests__/
│   │           └── Button.test.tsx
│   └── hooks/
│       ├── useDebounce.ts
│       └── __tests__/
│           └── useDebounce.test.ts
├── features/
│   └── article-card/
│       └── ui/
│           ├── ArticleCard.tsx
│           └── __tests__/
│               └── ArticleCard.test.tsx
└── redux/
    └── modules/
        └── news/
            ├── newsSlice.ts
            └── __tests__/
                └── newsSlice.test.ts
```

### Testing Principles

- ✅ **No third-party mocking libraries** - Pure Jest mocks only
- ✅ **Accessibility-first** - Using `getByRole`, `getByLabelText`
- ✅ **User-centric** - Testing user interactions with `@testing-library/user-event`
- ✅ **Isolated tests** - Each test suite mocks dependencies
- ✅ **Type-safe** - Full TypeScript support in tests

## Scripts

### Development

- `dev` - Start dev server
- `build` - Production build
- `lint` - Run ESLint
- `lint:fix` - Fix linting issues
- `prettier` - Check formatting
- `prettier:fix` - Fix formatting
- `format` - Fix both linting and formatting

### Testing

- `test` - Run all tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Generate coverage report

### Docker

- `docker:build` - Build image
- `docker:run` - Run container
- `docker:dev` - Development with hot reload
- `docker:prod` - Production deployment
- `docker:stop` - Stop containers
- `docker:clean` - Remove all Docker resources

## Production Features

### Docker Deployment

#### Prerequisites

- Docker v20.10+
- Docker Compose v2.0+
- `.env` file with API keys (see Environment Variables section)

#### Quick Start with Docker

```bash
# 1. Make sure you have a .env file with your API keys
cp .env.example .env
# Edit .env with your actual API keys

# 2. Build and start the production container
docker-compose up -d news-aggregator

# 3. Access the application
# http://localhost:3000

# 4. Check container status and health
docker-compose ps

# 5. View logs
docker-compose logs -f news-aggregator

# 6. Stop the container
docker-compose down
```

#### Development Mode with Docker

```bash
# Start development server with hot reload
docker-compose --profile dev up news-aggregator-dev

# Access at http://localhost:5174
```

#### Manual Docker Commands

```bash
# Build image with API keys from .env
docker build \
  --build-arg VITE_NEWS_API_KEY=${VITE_NEWS_API_KEY} \
  --build-arg VITE_GUARDIAN_API_KEY=${VITE_GUARDIAN_API_KEY} \
  --build-arg VITE_NYT_API_KEY=${VITE_NYT_API_KEY} \
  -t news-aggregator .

# Run container
docker run -d -p 3000:80 --name news-app news-aggregator

# View logs
docker logs -f news-app

# Stop and remove
docker stop news-app && docker rm news-app
```

### Docker Optimization

- Multi-stage build (Node → Nginx)
- Gzip compression
- Static asset caching (1 year)
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Health checks (HTTP probe on port 80)
- SPA routing support (fallback to index.html)
- Minimal production image (~40MB)

### How Environment Variables Work in Docker

#### Production Build (`Dockerfile`)

```dockerfile
# Build arguments receive values from docker-compose.yml
ARG VITE_NEWS_API_KEY
ARG VITE_GUARDIAN_API_KEY
ARG VITE_NYT_API_KEY

# Set as environment variables during build
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY
ENV VITE_GUARDIAN_API_KEY=$VITE_GUARDIAN_API_KEY
ENV VITE_NYT_API_KEY=$VITE_NYT_API_KEY

# Vite embeds these into the JavaScript bundle at build time
RUN npm run build
```

#### Docker Compose Configuration

```yaml
services:
  news-aggregator:
    build:
      args:
        # Reads from .env file automatically
        - VITE_NEWS_API_KEY=${VITE_NEWS_API_KEY}
        - VITE_GUARDIAN_API_KEY=${VITE_GUARDIAN_API_KEY}
        - VITE_NYT_API_KEY=${VITE_NYT_API_KEY}
```

#### Security Notes

- `.env` file is excluded via `.dockerignore`
- API keys are embedded in the JavaScript bundle (client-side app)
- For sensitive server-side operations, use a backend API proxy
- Never commit `.env` files to version control

### Performance

- React Compiler optimization
- Code splitting
- Lazy loading
- Debounced search
- Optimized re-renders

## Key Features

- **Multi-source aggregation** - NewsAPI, Guardian, NYT
- **Advanced filtering** - By source, category, date range
- **Smart search** - Debounced with 3-character minimum
- **Favorites system** - By author, category, and source
- **Responsive design** - Mobile-first approach
- **Dark mode ready** - SCSS variable system
- **Type-safe** - Full TypeScript coverage

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

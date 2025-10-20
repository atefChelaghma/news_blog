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

```bash
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GUARDIAN_API_KEY=your_guardian_key
VITE_NYT_API_KEY=your_nytimes_key
```

## Scripts

### Development

- `dev` - Start dev server
- `build` - Production build
- `lint` - Run ESLint
- `lint:fix` - Fix linting issues
- `prettier` - Check formatting
- `prettier:fix` - Fix formatting
- `format` - Fix both linting and formatting

### Docker

- `docker:build` - Build image
- `docker:run` - Run container
- `docker:dev` - Development with hot reload
- `docker:prod` - Production deployment
- `docker:stop` - Stop containers
- `docker:clean` - Remove all Docker resources

## Production Features

### Docker Optimization

- Multi-stage build (Node → Nginx)
- Gzip compression
- Static asset caching (1 year)
- Security headers
- Health checks
- SPA routing support

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

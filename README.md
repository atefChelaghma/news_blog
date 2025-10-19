# Modern News Aggregator

A modern news aggregation application built with React, Redux Toolkit, and SCSS following Feature-Sliced Design (FSD) architecture.

## Prerequisites

### For Local Development

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### For Docker Deployment

- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)

## Getting Started

### Option 1: Local Development

#### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Opens [http://localhost:5174](http://localhost:5174)

#### 3. Build for Production

```bash
npm run build
# or
yarn build
```

### Option 2: Docker Deployment 🐳

#### Quick Start (Production)

```bash
# Build and run production container
docker-compose up --build

# Or using npm scripts
npm run docker:prod
```

Access the application at [http://localhost:3000](http://localhost:3000)

#### Development with Docker

```bash
# Run development container with hot reload
docker-compose --profile dev up --build

# Or using npm scripts
npm run docker:dev
```

Access the development server at [http://localhost:5174](http://localhost:5174)

#### Manual Docker Commands

##### Build Docker Image

```bash
docker build -t modern-news-aggregator .

# Or using npm script
npm run docker:build
```

##### Run Docker Container

```bash
docker run -p 3000:80 modern-news-aggregator

# Or using npm script
npm run docker:run
```

##### Stop and Clean Up

```bash
# Stop containers
docker-compose down

# Stop and remove everything (containers, images, volumes)
npm run docker:clean
```

## Docker Architecture

### Production Setup

- **Multi-stage build**: Optimized for production
- **Nginx**: Serves static files with compression and caching
- **Health checks**: Ensures container reliability
- **Security headers**: Basic security configuration
- **Port**: 3000 (external) → 80 (internal)

### Development Setup

- **Hot reload**: Live code updates
- **Volume mounting**: Local code changes reflected immediately
- **Port**: 5174 (external) → 5174 (internal)
- **Full development environment**

## Available Scripts

### Local Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Docker Scripts

- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run production container
- `npm run docker:dev` - Run development container
- `npm run docker:prod` - Run production with Docker Compose
- `npm run docker:stop` - Stop Docker containers
- `npm run docker:clean` - Clean up Docker resources

## Environment Variables

Create a `.env` file in the root directory:

```bash
# API Keys (optional - app works with mock data)
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GUARDIAN_API_KEY=your_guardian_key
VITE_NYT_API_KEY=your_nytimes_key

# Development
VITE_API_BASE_URL=http://localhost:5174
```

## Architecture

This project follows **Feature-Sliced Design (FSD)** principles:

```
src/
├── app/           # Application initialization
├── pages/         # Full page components
├── widgets/       # Compositional UI blocks
├── features/      # User interaction features
├── entities/      # Business logic entities
└── shared/        # Reusable components and utilities
```

### Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit with Redux Thunk
- **Styling**: SCSS with modular architecture
- **Build Tool**: Vite
- **Containerization**: Docker with Nginx
- **Code Quality**: ESLint, TypeScript

## Troubleshooting

### Local Development Issues

- **Port 5174 in use**: Kill the process or use a different port
- **Dependencies issues**: Delete `node_modules` and run `npm install`
- **Build fails**: Check TypeScript errors with `npm run lint`

### Docker Issues

- **Docker build fails**: Ensure Docker is running and has sufficient resources
- **Port conflicts**: Change ports in `docker-compose.yml`
- **Container won't start**: Check logs with `docker-compose logs`
- **Permission issues**: Ensure Docker has file system access

### Common Docker Commands

```bash
# View running containers
docker ps

# View container logs
docker-compose logs news-aggregator

# Execute commands in container
docker exec -it modern-news-aggregator sh

# Remove all containers and images
docker system prune -a
```

## Performance

### Production Optimizations

- **Gzip compression** enabled
- **Static asset caching** (1 year)
- **Multi-stage Docker build** (smaller image size)
- **Nginx optimization** for React SPA
- **Health checks** for container monitoring

### Bundle Analysis

```bash
npm run build
# Check dist/ folder size and structure
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker: `npm run docker:dev`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

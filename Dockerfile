# Multi-stage build

# Stage 1: Build frontend and backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json yarn.lock ./

# Copy workspaces
COPY frontend ./frontend
COPY backend-express ./backend-express

# Install dependencies
RUN yarn install --frozen-lockfile

# Build frontend and backend
RUN yarn build

# Stage 2: Production runtime
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy only necessary files from builder
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/backend-express/dist ./backend-express/dist
COPY --from=builder /app/backend-express/node_modules ./backend-express/node_modules
COPY --from=builder /app/backend-express/prisma ./backend-express/prisma
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/projects', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run app
ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]

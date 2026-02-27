# Stage 1: Builder - This stage builds the Next.js application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Remove any existing .env files (like .env.local) copied from host to prevent conflicts
RUN rm -f .env*

# Accept the build argument for the environment file (default to .env)
ARG ENV_FILE=.env
# Copy the specified env file to .env so Next.js picks it up during build
COPY ${ENV_FILE} .env

# Build the application
RUN npm run build

# Stage 2: Runner - This stage creates the final, lean production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Run the application as a non-root user for better security
USER node

# Expose the port the app will run on (can be overridden by docker-compose)
EXPOSE 3001

# The command to start the Next.js server
CMD ["npm", "run", "start"]

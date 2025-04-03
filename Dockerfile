# --- Stage 1: Build the Next.js application ---
    FROM node:20-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Install OS dependencies needed for Prisma (like openssl) if any
    # RUN apk add --no-cache openssl
    
    # Copy package manifests first to leverage Docker build cache
    COPY package.json package-lock.json* ./
    
    # Install all dependencies (including devDependencies for build)
    # Use --frozen-lockfile for reproducible installs
    RUN npm install --frozen-lockfile
    
    # Copy Prisma schema (needed for generation during build)
    COPY prisma ./prisma/
    
    # Copy the rest of the application source code (respects .dockerignore)
    COPY . .
    
    # Run the build script (prisma generate && next build)
    # Pass build-time env vars if needed using ARG/ENV in Dockerfile or --build-arg
    # Example:
    # ARG NEXT_PUBLIC_SOME_KEY
    # ENV NEXT_PUBLIC_SOME_KEY=$NEXT_PUBLIC_SOME_KEY
    RUN npm run build
    
    # Prune devDependencies after build
    RUN npm prune --production
    
    # --- Stage 2: Create the final production image ---
    FROM node:20-alpine AS production
    
    # Set working directory
    WORKDIR /app
    
    # Create a non-root user and group for security
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # Copy necessary artifacts from the 'builder' stage
    # Copy package files first (needed for npm start)
    COPY --from=builder /app/package*.json ./
    
    # Copy pruned production node_modules
    COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
    
    # Copy built application files and public assets
    COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
    
    # Copy configuration files needed at runtime
    COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
    
    # Copy Prisma schema - needed at runtime by Prisma Client to connect
    # If your DATABASE_URL is in .env, Prisma Client still needs schema location info
    COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
    
    # Ensure the application directory is owned by the non-root user
    # Already handled by --chown in COPY, but can be explicit for /app itself
    RUN chown -R nextjs:nodejs /app
    
    # Switch to the non-root user
    USER nextjs
    
    # Set environment variables for production
    ENV NODE_ENV production
    # Default port, can be overridden by docker-compose or deployment platform
    ENV PORT 3000
    
    # Expose the port the app runs on (matches ENV PORT)
    EXPOSE 3000
    
    # Define the command to start the Next.js application using the 'start' script
    CMD ["npm", "start"]
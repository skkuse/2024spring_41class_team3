# frontend Dockerfile

# Use a Node.js image to build the React app
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the node options to increase the memory limit
ENV NODE_OPTIONS="--max-old-space-size=2048"


# Build the React app
RUN npm run build

# Use an Nginx image to serve the static files
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
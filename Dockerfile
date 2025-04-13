# Step 1: Build the React app
FROM node:18-alpine as builder
WORKDIR /app

# Copy package files
COPY package.json . 
COPY package-lock.json . 
RUN npm install

# Copy the rest of the application
COPY . . 

# Build the React app (output goes to /app/build by default)
RUN npm run build

# Step 2: Serve the app using NGINX
FROM nginx:1.19.0

# Clean default NGINX content
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy the built React app to the NGINX HTML directory
COPY --from=builder /app/build .

# Run NGINX
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Use Node.js 20 (Alpine is a lightweight version)
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
# (Optional for docker-compose local dev due to volumes, but good practice)
COPY . .

# Expose the port Next.js uses
EXPOSE 3000

# Command to run the development server
CMD ["npm", "run", "dev"]

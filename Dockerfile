# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for development convenience
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on (adjust if different)
EXPOSE 3000

# Start the application using nodemon
CMD ["nodemon", "./src/app.js"]

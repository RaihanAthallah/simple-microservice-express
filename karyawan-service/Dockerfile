FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Run the server using npm start to respect package.json configuration
CMD ["npm", "start"]
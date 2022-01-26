FROM node:16.13.1-alpine As build-stage

# Create app directory
WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:16.13.1-alpine as production-stage

# Copy necessary files
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/dist ./dist

EXPOSE 8080

CMD ["npm", "run", "start"]

# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
# Create and Go into app dir
WORKDIR /app 
# Copy our package json into the working dir
COPY package*.json /app/
RUN yarn install
#Copy our source into our working dir
COPY . /app/
EXPOSE 3000
FROM node:20

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 20000

CMD [ "npm", "start" ]


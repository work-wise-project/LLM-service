FROM node:22.11.0-slim

WORKDIR /LLM-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4002

CMD ["npm", "run", "start"]

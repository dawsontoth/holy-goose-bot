FROM node:14.19.1 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM dependencies as production
WORKDIR /app
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY conf.json ./conf.json
COPY corpus-en.json ./corpus-en.json
RUN npm run build
CMD [ "node", "build", "index.js" ]

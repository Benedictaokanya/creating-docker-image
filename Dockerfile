
FROM node:22-alpine

WORKDIR /app

COPY server.js .

EXPOSE 8001

USER node

CMD ["node", "server.js"]

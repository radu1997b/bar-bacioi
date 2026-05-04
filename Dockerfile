FROM node:20-slim

WORKDIR /app

RUN npm install -g wrangler@4

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 8788

ENTRYPOINT ["./docker-entrypoint.sh"]

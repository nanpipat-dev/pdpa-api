FROM node:16.3.0-alpine
WORKDIR /usr

RUN apk update && apk add --no-cache nmap && \
    echo @edge apk add -X https://dl-cdn.alpinelinux.org/alpine/v3.16/main -u alpine-keys >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install && npm run build
RUN node node_modules/puppeteer/install.js
EXPOSE 5055
CMD ["npm","start"]
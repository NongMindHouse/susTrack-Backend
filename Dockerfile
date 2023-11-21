FROM node:18-alpine AS node
COPY . /app
WORKDIR /app

# Set timezone
RUN apk add tzdata
ENV TZ Asia/Bangkok

FROM node AS prod-deps
RUN npm install --omit=dev --frozen-lockfile
RUN npx prisma generate

FROM node AS build
RUN npm install --frozen-lockfile
RUN npm run build

FROM node
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV PORT=8080
EXPOSE $PORT
CMD ["npm","start"]
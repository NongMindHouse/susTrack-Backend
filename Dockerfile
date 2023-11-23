FROM node:18-alpine AS node
COPY . /app
WORKDIR /app

# Set timezone
RUN apk add tzdata
ENV TZ Asia/Bangkok

FROM node AS prod-deps
RUN yarn --omit=dev --frozen-lockfile
RUN npx prisma generate

FROM node AS build
RUN yarn --frozen-lockfile
RUN yarn build

FROM node
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE $PORT
CMD ["yarn","start"]
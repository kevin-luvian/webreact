FROM node:12 as build
WORKDIR /frontendApp
ENV PATH ./node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

FROM nginx:1.19.1
COPY --from=build /frontendApp/build /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

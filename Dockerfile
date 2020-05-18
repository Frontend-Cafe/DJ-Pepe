FROM node:lts

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y

COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build
# Start
CMD [ "npm", "start" ]
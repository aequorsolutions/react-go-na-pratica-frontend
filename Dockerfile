FROM node:20

WORKDIR /home/node/app

# RUN apt update && apt upgrade -y && apt clean
# RUN apk update

USER node

CMD [ "tail", "-f", "/dev/null" ]
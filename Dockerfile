FROM node:carbon-stretch

MAINTAINER MNCA Team

RUN apt update

RUN apt install -y git vim

WORKDIR /opt

# clone mnca-mngt repo
RUN git clone https://github.com/morquea/mnca-mngt.git 

# Change Workdir
WORKDIR /opt/mnca-mngt

# npm dependencies
RUN npm cache clean -f && \
    npm install

# expose port 
EXPOSE 8888

# environment
#ENV DEBUG=mnca:*

# entrypoint
#ENTRYPOINT ["./scripts/wait-for-it.sh idm.mnca.com:3100 -- npm run start"]

ENTRYPOINT ["npm", "run",  "start"]


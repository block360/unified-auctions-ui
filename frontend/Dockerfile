# see https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=node:16.9.1

FROM $NODE_VERSION

# create destination directory
RUN mkdir -p /core
RUN mkdir -p /frontend

COPY ./core/ /core

COPY ./frontend/ /frontend

WORKDIR /frontend

EXPOSE 9080

# bake env variables
ARG RPC_URL
ENV RPC_URL=${RPC_URL}
ARG PRODUCTION_DOMAIN
ENV PRODUCTION_DOMAIN=${PRODUCTION_DOMAIN}
ARG CONTACT_EMAIL
ENV CONTACT_EMAIL=${CONTACT_EMAIL}
ARG STAGING_BANNER_URL
ENV STAGING_BANNER_URL=${STAGING_BANNER_URL}
ARG HEAPIO_ID
ENV HEAPIO_ID=${HEAPIO_ID}
ARG FRONTEND_ORIGIN
ENV FRONTEND_ORIGIN=${FRONTEND_ORIGIN}
ARG CHAINLOG_ADDRESS
ENV CHAINLOG_ADDRESS=${CHAINLOG_ADDRESS}

RUN npm install 


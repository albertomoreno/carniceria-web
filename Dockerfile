# Copyright (c) 2015 Alberto Moreno.
# Use of this source code is governed by a MIT-style license that
# can be found in the LICENSE.md file.

FROM google/debian:wheezy
MAINTAINER Alberto Moreno <albertinivva@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update

RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs
RUN npm install -g nodemon

RUN groupadd -r -g 1000 docker && \
    useradd -r -g docker -u 1000 alberto && \
    mkdir /home/alberto && \
    chown alberto:docker /home/alberto

COPY . /opt/web
WORKDIR /opt/web

RUN npm i

USER alberto

CMD node index.js

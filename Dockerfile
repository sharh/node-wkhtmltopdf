FROM keymetrics/pm2:16-buster

WORKDIR /app
# Bundle APP files
COPY . /app
# RUN apt-get -f install
# RUN dpkg --install wkhtmltox_0.12.6-1.buster_amd64.deb
# RUN apt-get -f install
# 如果有新增字体放在fonts这个里面，如果出现乱码，下载字体放进去
# 从网上下载相关字体
# windows 用户，可以从 C:\Windows\fonts 目录找到字体文件
COPY fonts/* /usr/share/fonts/

ARG  jpeg=libjpeg-dev
ARG  ssl=libssl-dev
ENV  CFLAGS=-w CXXFLAGS=-w
# 安装wkhtmltox依赖
RUN apt-get update && apt-get install -y -q \
    build-essential \
    libfontconfig1-dev \
    libfreetype6-dev \
    $jpeg \
    libpng-dev \
    $ssl \
    libx11-dev \
    libxext-dev \
    libxrender-dev \
    python \
    zlib1g-dev \
    xfonts-75dpi \
    xfonts-base \
    && rm -rf /var/lib/apt/lists/*
# 安装wkhtmltox：wkhtmltohtml、wkhtmltoimage
RUN dpkg -i wkhtmltox_0.12.6-1.buster_amd64.deb
# COPY package.json .
# COPY pm2.json .
# RUN apk update
# RUN apk add wkhtmltopdf
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

CMD [ "pm2-runtime", "start", "pm2.json" ]
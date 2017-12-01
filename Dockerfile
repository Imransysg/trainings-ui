# Stage 1
FROM node:8 as builder
MAINTAINER Imransysg
RUN mkdir -p /app
WORKDIR /app

ADD . /app

RUN npm install && npm install git -g && npm install bower -g
#RUN echo ‘{ “allow_root”: true }’ > /root/.bowerrc
RUN bower install --allow-root && npm install gulp -g && gulp serve:dist

#Stage 2

#Pull the Base Ubuntu Image
FROM ubuntu 

# File Author / Maintainer
MAINTAINER Imransysg

# Update the repository sources list
RUN \
apt-get update && \ 
apt-get install -y software-properties-common python-software-properties && \
add-apt-repository -y ppa:nginx/stable && \
apt-get update && \
apt-get install -y nginx && \
rm -rf /var/lib/apt/lists/* && \ 
echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
chown -R www-data:www-data /var/lib/nginx

# Define mountable directories.
#VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html", "/etc/ssl/certs"]
COPY --from=builder /app/dist /usr/share/nginx/html

# Define working directory.
WORKDIR /etc/nginx

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80


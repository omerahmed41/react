FROM nginx
#COPY . .
COPY html/error/429.html ./etc/nginx/html/

COPY ./certs/jao.* /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
ADD services.conf /etc/nginx/conf.d/

RUN ls /etc/nginx/conf.d/
# COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# web_project
to run the project completly - run the client, the server, and mongodb.

docker commands:

docker build --platform linux/amd64 -t client .
docker run -dp 10.10.248.184:4000:5173 client

docker build --platform linux/amd64 -t server .
docker run -dp 10.10.248.184:443:443 server

change .env ip address

mongosh mongodb://admin:bartar20%40CS@localhost:21771

scp client.tgz st111@10.10.248.184:/home/st111/

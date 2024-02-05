# web_project
to run the project completly - run the client, the server, and mongodb.

docker commands:

docker build -t client .
docker run -dp 10.0.0.13:5173:5173 client

docker build -t server .
docker run -dp 10.0.0.13:8080:8080 server

change .env ip address

mongosh mongodb://admin:bartar20%40CS@localhost:21771
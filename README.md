1. `docker run -p 33060:3306 --name files -e MYSQL_ROOT_PASSWORD=files -d mysql:latest`
2. ` docker exec -it files mysql -p && create database files;`
3. `cd api && go run .`
4. `cd web && ng serve --open`
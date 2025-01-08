# Proyecto Docker 🐳🐳🐳

1. Ejecutaremos nuestra aplicación en un solo servidor con docker (con tres contenedores en la misma máquina)
```zsh
# Database
$ docker volume create db_data
$ docker run -d \
  --name db-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -v db_data:/var/lib/postgresql/data \
  -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -p 5432:5432 \
  postgres:13

# Backend
$ docker build -t backend-node ./backend
$ docker run -d \
  --name backend-node \
  --link db-postgres:db \
  -p 8081:5000 \
  backend-node

# Frontend
$ docker build -t frontend-basic ./frontend
$ docker run -d \
  --name frontend-basic \
  -p 8080:80 \
  --link backend-node:backend \
  frontend-basic
```

2. Ejecutaremos nuestra aplicación en un solo servidor usando docker compose (con tres contenedores en la misma máquina)

3. Ejecutaremos nuestra aplicación ejecutando cada contenedor en una máquina distinta)

4. Desplegaremos con Ansible cada contenedor en una máquina distinta

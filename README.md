# graphql-db-example

use method

```
$ git clone https://github.com/Otazoman/graphql-db-example.git
$ cd graphql-db-example
$ cd docker/postgresql
$ mkdir -p pgadmin
$ chmod 777 pgadmin
$ docker compose up -d
$ sudo chmod -R 777 db
$ sudo chmod -R 777 pgadmin
$ cd ../node
$ docker compose up -d

$ docker container exec -it node-node-dev-1 sh
/app $ npx prisma migrate dev --name sample
/app $ npx prisma generate


# production
/app $ npm start
# develop
/app $ npm run dev
# test
$ npm test
```

# graphql-db-example

use method

```
$ git clone https://github.com/Otazoman/graphql-example.git
$ cd graphql-example
$ cd docker/postgresql
$ mkdir -p pgadmin
$ chmod 777 pgadmin
$ docker compose up -d
$ sudo chmod -R 777 db
$ sudo chmod -R 777 pgadmin
$ cd ../..
$ npm ci
$ npx prisma migrate dev --name sample
$ npx prisma generate
// production
$ npm start
// develop
$ npm run dev
```

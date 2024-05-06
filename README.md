# graphql-db-example

## use method

```
#
# npm command description
#
# production
/app $ npm start
# develop
/app $ npm run dev
# test
$ npm test


#
# How to run in containers
#

$ git clone https://github.com/Otazoman/graphql-db-example.git

#
# Ⅰ-A.PostgreSql
#
$ cd graphql-db-example/docker/postgresql
$ mkdir -p pgadmin
$ chmod 777 pgadmin
# After the above implementation, Work performed on Ⅱ.Start containers and Ⅲ.Migration & generate
$ cd ../postgresql
$ sudo chmod -R 777 db
$ sudo chmod -R 777 pgadmin

#
# Ⅰ-B.MySQL
#
$ cd graphql-db-example/docker/mysql
$ mkdir -p db
$ sudo mkdir db/data
$ sudo mkdir db/conf
$ sudo mkdir db/log
$ sudo tee conf/my.cnf <<_EOF_
[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

[client]
default-character-set=utf8mb4
_EOF_
# After the above implementation,Work performed on Ⅱ.Start containers
# In phpMyadmin, under [Home], select [User Accounts] and in [Edit Permissions] for the user [mysqluser].
Check all in [Data] and [Structure] and click [Run].
# Work performed on Ⅲ.Migration & generate


#
# Ⅰ-C.mongo
#

$ cd graphql-db-example/docker/mongodb/
$ sudo mkdir db
$ cd db
# setting init.js
$ sudo mkdir init
$ MONGO_HOST=graphql-sample-mongo-db
$ ROOT_USERNAME=root
$ ROOT_PASSWORD=password
$ DATABASE_NAME=sample
$ COLLECTION_NAME=sample

$ sudo tee init/config.js <<_EOF_
const MONGO_HOST = "${MONGO_HOST}";
const ROOT_USERNAME = "${ROOT_USERNAME}";
const ROOT_PASSWORD = "${ROOT_PASSWORD}";
const DATABASE_NAME = "${DATABASE_NAME}";
const COLLECTION_NAME = "${COLLECTION_NAME}";
_EOF_

$ sudo tee init/db_init.js <<_EOF_
init = false;
print("Init script ...");

try {
  load("./config.js");

  if (!db.isMaster().ismaster) {
    print("Error: primary not ready, initialize ...");
    rs.initiate({
      _id: "my-replica-set",
      members: [{ _id: 0, host: MONGO_HOST + ":27017" }],
    });
    quit(1);
  } else {
    if (!init) {
      admin = db.getSiblingDB("admin");
      admin.createUser({
        user: ROOT_USERNAME,
        pwd: ROOT_PASSWORD,
        roles: ["readWriteAnyDatabase"],
      });
      db = db.getSiblingDB(DATABASE_NAME);
      db.createCollection(COLLECTION_NAME);
      init = true;
    }
  }
} catch (e) {
  rs.status().ok;
}
_EOF_

$ sudo chmod -R 777 init
$ cd ../
# After the above implementation,Work performed on Ⅱ.Start containers

#
# Ⅰ-D.SQLite
#
$ cd graphql-db-example/docker/node/
$ NETWORK_NAME=graphql-sample
$ docker compose --env-file ./config/.env.dev -p $NETWORK_NAME up -d
# After the above implementation,Work performed on Ⅲ-D.Migration & generate (SQLite)

#
# Ⅱ.Start containers
#
$ NETWORK_NAME=graphql-sample
$ docker compose -p $NETWORK_NAME up -d
$ cd ../node/
$ docker compose --env-file ./config/.env.dev -p $NETWORK_NAME up -d

#
# Ⅲ-A.Migration & generate (PostgreSQL)
#
$ cd ../postgresql/db
$ sudo chmod -R 777 data
$ sudo cd ../../node
$ docker container exec -it node-dev sh
/app $ npx prisma migrate dev --name sample --schema prisma/pg/postgre_schema.prisma
/app $ npx prisma generate --schema prisma/pg/postgre_schema.prisma
/app $ exit
$ docker compose --env-file ./config/.env.dev restart


#
# Ⅲ-B.Migration & generate (MySQL)
#
$ docker container exec -it node-dev sh
/app $ npx prisma migrate dev --name sample --schema prisma/mysql/mysql_schema.prisma
/app $ npx prisma generate --schema prisma/mysql/mysql_schema.prisma
/app $ exit
$ docker compose --env-file ./config/.env.dev restart


#
# Ⅲ-C.Migration (mongoDB)
#
$ docker container exec -it node-dev sh
$ npx prisma db push --schema prisma/mongo/mongo_schema.prisma
$ docker compose --env-file ./config/.env.dev  restart


#
# Ⅲ-D.Migration & generate (SQLite)
#
$ docker container exec -it node-dev sh
/app $ npx prisma migrate dev --name sample --schema prisma/sqlite/sqlite_schema.prisma
/app $ npx prisma generate --schema prisma/sqlite/sqlite_schema.prisma
/app $ exit
$ docker compose --env-file ./config/.env.dev restart




```

---

## GraphQL

// Query(All)

```
query Query {
  getDatas {
    title
    author
    id
  }
}
```

// Query(Condition)

```
query GetFilteredDatas($filter: DataFilterInput)  {
  getDatas(filter: $filter) {
    id
    title
    author
  }
}

# variables
{
  "filter": {
    "author": "山田三郎"
  }
}
```

// Mutation(Create)

```
mutation Mutation($title: String, $author: String) {
  createData(title:$title,author:$author){
    title
    author
  }
}

# variables
{
  "title": "ドリル",
  "author": "山田三郎"
}
```

// Mutation(Update)

```
mutation UpdateData($id: ID!, $title: String, $author: String) {
  updateData(id: $id, title: $title, author: $author) {
    id
    title
    author
  }
}

# variables
{
  "id": 1,
  "title": "普通の本",
  "author": "田中一郎"
}
```

// Mutation(Delete)

```
mutation DeleteData($id: ID!) {
  deleteData(id: $id)
}


# variables
{
  "id": "1"
}
```

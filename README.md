# graphql-db-example

## use method

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

variables
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

variables
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

variables
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


variables
{
  "id": "1"
}
```

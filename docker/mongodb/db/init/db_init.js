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

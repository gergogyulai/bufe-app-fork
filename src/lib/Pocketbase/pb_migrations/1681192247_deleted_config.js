migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dpdihhj40ijs1f7");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dpdihhj40ijs1f7",
    "created": "2023-04-11 05:49:09.627Z",
    "updated": "2023-04-11 05:49:09.627Z",
    "name": "config",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "592scl5i",
        "name": "nyitvatartas",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ky1patpb",
        "name": "bufeclosedstatus",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})

migrate((db) => {
  const collection = new Collection({
    "id": "64ikv7e8jez6xl1",
    "created": "2023-04-12 04:09:04.604Z",
    "updated": "2023-04-12 04:09:04.604Z",
    "name": "nyitvatartas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "njbp8e8o",
        "name": "zarva",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ivzmlhhk",
        "name": "nyitvatartas",
        "type": "json",
        "required": true,
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("64ikv7e8jez6xl1");

  return dao.deleteCollection(collection);
})

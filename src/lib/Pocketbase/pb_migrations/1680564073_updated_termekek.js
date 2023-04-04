migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rccrtgmz",
    "name": "foto",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 8388608,
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": [
        "480x720"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // remove
  collection.schema.removeField("rccrtgmz")

  return dao.saveCollection(collection)
})

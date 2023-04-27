migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64ikv7e8jez6xl1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m8wuxpm3",
    "name": "szunetek",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64ikv7e8jez6xl1")

  // remove
  collection.schema.removeField("m8wuxpm3")

  return dao.saveCollection(collection)
})

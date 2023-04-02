migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rhszfzmr",
    "name": "payment",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Készpénz",
        "Bankkártya"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // remove
  collection.schema.removeField("rhszfzmr")

  return dao.saveCollection(collection)
})

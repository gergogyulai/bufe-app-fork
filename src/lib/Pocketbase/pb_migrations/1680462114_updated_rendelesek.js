migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rhszfzmr",
    "name": "paymentMethod",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x8dvkv2n",
    "name": "atveteliIdo",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Most",
        "2.szunet",
        "3.szunet",
        "4.szunet",
        "5.szunet",
        "6.szunet"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // update
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x8dvkv2n",
    "name": "atvetel",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Most",
        "2.szunet",
        "3.szunet",
        "4.szunet",
        "5.szunet",
        "6.szunet"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

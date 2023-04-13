migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64ikv7e8jez6xl1")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64ikv7e8jez6xl1")

  collection.updateRule = null

  return dao.saveCollection(collection)
})

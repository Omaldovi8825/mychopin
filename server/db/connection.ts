import { Collection, MongoClient } from "mongodb"

class MongoConnection {
  private collectionListas!: Collection
  private client!: MongoClient

  async connect() {
    if (!this.client) {
      const DB_URI = process.env.MONGO_DB_URI || ""
      const DB_NAME = process.env.DB_NAME || ""
      const DB_COLLECTION = process.env.DB_COLLECTION || ""
      this.client = new MongoClient(DB_URI)
      await this.client.connect()
      const db = this.client.db(DB_NAME)
      this.collectionListas = db.collection(DB_COLLECTION)
      console.log("MongoDB connected")
    }
  }

  get listas() {
    return this.collectionListas
  }

  async close() {
    await this.client.close()
  }
}

export default new MongoConnection()

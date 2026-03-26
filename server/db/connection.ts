import { Collection, Db, MongoClient } from "mongodb"
import { envs } from "../envs.js"

class MongoConnection {
  private client: MongoClient
  private db!: Db

  constructor() {
    this.client = new MongoClient(envs.DB_URI)
  }

  async connect() {
    await this.client.connect()
    this.db = this.client.db(envs.DB_NAME)
    console.log("MongoDB connected")
  }

  get listas(): Collection {
    return this.db.collection(envs.DB_COLLECTION)
  }

  async close() {
    await this.client.close()
  }
}

export default new MongoConnection()

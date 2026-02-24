import { ObjectId } from 'mongodb'

export interface Lista {
  _id?: ObjectId
  fecha: Date
  items: string[]
}

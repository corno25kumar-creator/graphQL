import { Document } from 'mongodb'
import { Document as MyMongooseDocument } from 'mongoose'

export interface DocCommonAtr extends Document {
  _id: unknown
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface BookDoc extends DocCommonAtr {
  title: string
  author: string
  year: number
  publisher: string
  genre: string
}
/*
gql : = naam ka function import kar rahe hain graphql-tag package se. Ye help karta hai GraphQL queries aur type definitions ko JavaScript mein likhne mein.

*/

import gql from 'graphql-tag'

/*
Mongoose library import kar rahe hain, jo MongoDB se connect karne aur data model banane ke kaam aati hai. Model type ko bhi import kar rahe hain TypeScript ke liye.
 */
import mongoose, { Model } from 'mongoose'

/*
 Apne project ke middlewares folder se authMiddlewareGraph naam ka function import kar rahe hain. Ye middleware GraphQL requests ko authenticate karega - matlab check karega ki request valid user se aa rahi hai ya nahi

*/
import { authMiddlewareGraph } from '../middlewares/index.js'

/*GraphContext type import kar rahe hain common.js file se. Ye TypeScript type batata hai ki GraphQL resolvers ke context object mein kya kya hoga (jaise req - HTTP request object) */

import { GraphContext } from '../types/common.js'

/*
BookDoc naam ka type import kar rahe hain doc.js se. Ye type batata hai ki ek Book document mein kaun kaun se fields honge (jaise title, author, etc). Basically MongoDB document ki shape define karta hai.
*/
import { BookDoc } from '../types/doc.js'

/*
Ek naya TypeScript interface bana rahe hain BookMongoDoc jo BookDoc ko extend karta hai. Iska matlab ye MongoDB document ki type hai, jo BookDoc ke saare fields lega.
 */

interface BookMongoDoc extends BookDoc {}


/*
BookMongoModel interface banaya jo Mongoose ke Model ko extend karta hai, aur isme BookMongoDoc type pass kiya. Ye batata hai ki jo model banega wo BookMongoDoc type ke documents handle karega.
*/
interface BookMongoModel extends Model<BookMongoDoc> {}


/*
Mongoose ka ek naya schema create kar rahe hain, jiska naam BookSchema hai. Is schema ka type BookMongoDoc hoga. Schema define karta hai ki document ka structure kya hoga
 */

const BookSchema = new mongoose.Schema<BookMongoDoc>(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

/*
id field par ek index banaya, aur usse unique bana diya. Iska matlab kisi bhi do books ka id same nahi ho sakta.
 */
BookSchema.index({ id: 1 }, { unique: true })

/*
Text index banaya - iska matlab in fields par full-text search kar sakte hain. default_language: 'none' ka matlab koi language-specific stemming nahi hogi, direct text match hoga.
*/
BookSchema.index(
  { title: 'text', author: 'text', genre: 'text', publisher: 'text' },
  { default_language: 'none' },
)

/*
Mongoose middleware (hook) - save event se pehle ye function chalega. Jab bhi koi document save hone wala hoga, ye function automatically call hoga.
*/

BookSchema.pre('save', async function (next) {
  // Generate unique id for new document
  if (!this.id) {
    // Generate a sql like id for the document
    this.id = `book_${this._id}`
  }

  next()
})

/*
Ab Mongoose ka model bana rahe hain. Model ka naam 'book' hai, aur schema BookSchema use hoga. Ye model database mein books collection se interact karega. Type arguments bhi diye hain - BookMongoDoc aur BookMongoModel.
 */
const BookModel = mongoose.model<BookMongoDoc, BookMongoModel>(
  'book',
  BookSchema,
)

/*
Is model ko export kar diya, taaki dusre files import kar sakein.
 */
export default BookModel

/*
GraphQL type definitions export kar rahe hain, gql tag ke saath. Isme hum GraphQL schema likhenge.
 */




/*
BookInput naam ka input type banaya. Ye mutations mein use hoga jab hum book create ya update karenge. Isme same fields hain but _id ya id nahi, kyunki input data hota hai, document nahi.
 */
export const BookTypeDef = gql`
  type Book {
    _id: ID!
    id: ID
    title: String
    author: String
    year: Int
    genre: String
    publisher: String
    createdAt: Date
    updatedAt: Date
  }

  input BookInput {
    title: String
    author: String
    year: Int
    genre: String
    publisher: String
  }

  extend type Query {
    bookList: [Book]!
    book(id: ID!): Book!
  }

  extend type Mutation {
    bookCreate(input: BookInput!): Book
    bookUpdate(id: ID!, input: BookInput!): Book
    bookDelete(id: ID!): Book
  }
`

export const BookResolver = {
  Query: {
    bookList: async (_: any, __: any, { req }: GraphContext) => {
      authMiddlewareGraph(req)
      const books = BookModel.find().sort({ createdAt: -1 })
      return books
    },
    book: async (_: any, { id }: any, { req }: GraphContext) => {
      authMiddlewareGraph(req)
      const book = BookModel.findById(id)
      return book
    },
  },
  Mutation: {
    bookCreate: async (_: any, { input }: any, { req }: GraphContext) => {
      authMiddlewareGraph(req)
      const book = new BookModel(input)
      await book.save()
      return book
    },
    bookUpdate: async (_: any, { id, input }: any, { req }: GraphContext) => {
      authMiddlewareGraph(req)
      return await BookModel.findByIdAndUpdate(id, input, { new: true })
    },
    bookDelete: async (_: any, { id }: any, { req }: GraphContext) => {
      authMiddlewareGraph(req)
      return await BookModel.findByIdAndDelete(id)
    },
  },
}
export interface DocCommonAtr {
  _id: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface BookDoc extends DocCommonAtr {
  title: string
  author: string
  year: number
  genre: string
  publisher: string
}

export interface BookInput {
  title: string
  author: string
  year: Date
  genre: string
  publisher: string
}
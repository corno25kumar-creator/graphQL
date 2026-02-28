import { gql } from '@apollo/client'

export const BOOK_LIST_QUERY = gql`
  query bookList {
    bookList {
      _id
      id
      title
      author
      year
      genre
      publisher
    }
  }
`

export const BOOK_QUERY = gql`
  query book($id: ID!) {
    book(id: $id) {
      _id
      id
      title
      author
      year
      genre
      publisher
    }
  }
`

export const BOOK_CREATE_MUTATION = gql`
  mutation bookCreate($input: BookInput!) {
    bookCreate(input: $input) {
      _id
      id
      title
      author
      year
      genre
      publisher
    }
  }
`

export const BOOK_UPDATE_MUTATION = gql`
  mutation bookUpdate($id: ID!, $input: BookInput!) {
    bookUpdate(id: $id, input: $input) {
      _id
      id
      title
      author
      year
      genre
      publisher
    }
  }
`

export const BOOK_DELETE_MUTATION = gql`
  mutation bookDelete($id: ID!) {
    bookDelete(id: $id) {
      _id
      title
    }
  }
`
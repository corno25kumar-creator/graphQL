'use client'

import {
  BOOK_DELETE_MUTATION,
  BOOK_LIST_QUERY,
} from '@/lib/graphql/gql/book.gql'
import { useBookStore } from '@/stores/useBookStore'
import { BookDoc } from '@/types'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import React from 'react'
import BookCreate from './BookCreate'
import BookUpdate from './BookUpdate'
import { showToast } from '@/lib/utils/toast'

export default function BookList() {
  const {
    bookList,
    setBookList,
    showAddBookDialog,
    showEditBookDialog,
    onBookDelete,
  } = useBookStore()

  useQuery<{
    bookList: BookDoc[]
  }>(BOOK_LIST_QUERY, {
    onCompleted: (data) => {
      setBookList(data.bookList)
    },
  })

  const [deleteBookMutation] = useMutation<{
    bookDelete: BookDoc
  }>(BOOK_DELETE_MUTATION, {
    onCompleted: (data) => {
      showToast('success', 'Boom Deleted', data.bookDelete.title)
      onBookDelete(data.bookDelete._id)
    },
    onError: (err) => {
      showToast('error', 'Boom Delete Failed', err.message)
    },
  })

  const onDelete = (id: string) => {
    deleteBookMutation({
      variables: {
        id,
      },
    })
  }

  // Edit Book
  const onEdit = (id: string) => {
    showEditBookDialog(id)
  }

  return (
    <div>
      <BookCreate />
      <BookUpdate />
      <DataTable
        value={bookList}
        stripedRows
        showGridlines
        rowsPerPageOptions={[5, 10, 20]}
        rows={5}
        paginator
        header={
          <div className="flex justify-content-between align-items-center">
            <h2 className="m-0">Books</h2>
            <Button
              label="Add Book"
              icon="pi pi-plus"
              onClick={() => showAddBookDialog()}
            />
          </div>
        }
      >
        <Column field="title" header="Title" />
        <Column field="author" header="Author" />
        <Column field="year" header="Year" />
        <Column field="genre" header="Genre" />
        <Column field="publisher" header="Publisher" />
        <Column
          field="actions"
          header="Actions"
          className="w-1rem"
          body={(rowData) => (
            <div className="flex justify-content-end gap-2">
              <Button
                label="Edit"
                severity="info"
                icon="pi pi-pencil"
                onClick={() => onEdit(rowData._id)}
              />
              <Button
                label="Delete"
                severity="danger"
                icon="pi pi-trash"
                onClick={() => onDelete(rowData._id)}
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  )
}
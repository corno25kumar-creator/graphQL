import { BOOK_CREATE_MUTATION } from '@/lib/graphql/gql/book.gql'
import { showToast } from '@/lib/utils/toast'
import { useBookStore } from '@/stores/useBookStore'
import { BookDoc, BookInput } from '@/types'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function BookCreate() {
  const { closeAddBookDialog, isAddBookDialogOpen, onBookCreate } =
    useBookStore()

  const [createBookMutation] = useMutation<{
    bookCreate: BookDoc
  }>(BOOK_CREATE_MUTATION, {
    onCompleted: (data) => {
      showToast('success', 'Boom Created')
      onBookCreate(data.bookCreate)
      onHide()
    },
    onError: (err) => {
      showToast('error', 'Boom Created Failed', err.message)
    },
  })

  const formik = useFormik<BookInput>({
    initialValues: {
      title: '',
      author: '',
      genre: '',
      publisher: '',
      year: new Date(),
    },
    onSubmit: async (input, options) => {
      options.setSubmitting(true)
      await createBookMutation({
        variables: {
          input: {
            ...input,
            year: input.year.getFullYear(),
          },
        },
      })
      options.setSubmitting(false)
    },
  })

  const onHide = () => {
    closeAddBookDialog()
    formik.resetForm()
  }

  return (
    <Dialog
      visible={isAddBookDialogOpen}
      onHide={onHide}
      header="Add Book"
      className="w-30rem"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3">
        {/* Title */}
        <div className="flex flex-column gap-2">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            name="title"
            placeholder="Enter title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>

        {/* Author */}
        <div className="flex flex-column gap-2">
          <label htmlFor="author">Author</label>
          <InputText
            id="author"
            name="author"
            placeholder="Enter author"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
        </div>

        {/* Genre */}
        <div className="flex flex-column gap-2">
          <label htmlFor="genre">Genre</label>
          <InputText
            id="genre"
            name="genre"
            placeholder="Enter genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
          />
        </div>

        {/* Publisher */}
        <div className="flex flex-column gap-2">
          <label htmlFor="publisher">Publisher</label>
          <InputText
            id="publisher"
            name="publisher"
            placeholder="Enter publisher"
            value={formik.values.publisher}
            onChange={formik.handleChange}
          />
        </div>

        {/* Year */}
        <div className="flex flex-column gap-2">
          <label htmlFor="year">Year</label>
          <Calendar
            value={formik.values.year}
            onChange={(e) => formik.setFieldValue('year', e.value)}
            view="year"
            dateFormat="yy"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-content-end gap-2 mt-3">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            onClick={onHide}
          />
          <Button
            type="submit"
            label="Save"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  )
}
import { BOOK_QUERY, BOOK_UPDATE_MUTATION } from '@/lib/graphql/gql/book.gql'
import { showToast } from '@/lib/utils/toast'
import { useBookStore } from '@/stores/useBookStore'
import { BookDoc, BookInput } from '@/types'
import { useMutation, useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import Spinner from './Spinner'

export default function BookUpdate() {
  const {
    closeEditBookDialog,
    isEditBookDialogOpen,
    onBookUpdate,
    editBookId,
  } = useBookStore()

  const { loading } = useQuery<{
    book: BookDoc
  }>(BOOK_QUERY, {
    skip: !editBookId,
    variables: {
      id: editBookId,
    },
    onCompleted: (data) => {
      formik.setValues({
        title: data.book.title,
        author: data.book.author,
        genre: data.book.genre,
        publisher: data.book.publisher,
        year: new Date(data.book.year),
      })
    },
  })

  const [updateBookMutation] = useMutation<{
    bookUpdate: BookDoc
  }>(BOOK_UPDATE_MUTATION, {
    onCompleted: (data) => {
      showToast('success', 'Boom Updated', data.bookUpdate.title)
      onBookUpdate(data.bookUpdate)
      onHide()
    },
    onError: (err) => {
      showToast('error', 'Boom Update Failed', err.message)
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
      await updateBookMutation({
        variables: {
          id: editBookId,
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
    closeEditBookDialog()
    formik.resetForm()
  }

  return (
    <Dialog
      visible={isEditBookDialogOpen}
      onHide={onHide}
      header="Add Book"
      className="w-30rem"
    >
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </Dialog>
  )
}
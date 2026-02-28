import { BookDoc } from '@/types'
import { create } from 'zustand'

type BookStore = {
  // Add Book Dialog
  isAddBookDialogOpen: boolean
  showAddBookDialog: () => void
  closeAddBookDialog: () => void
  // Edit Book Dialog
  isEditBookDialogOpen: boolean
  editBookId: string | null
  showEditBookDialog: (id: string) => void
  closeEditBookDialog: () => void
  // Book List
  bookList: BookDoc[]
  setBookList: (bookList: BookDoc[]) => void
  // Book Update
  onBookUpdate: (book: BookDoc) => void
  // Book Create
  onBookCreate: (book: BookDoc) => void
  // Book Delete
  onBookDelete: (id: string) => void
}

export const useBookStore = create<BookStore>((set) => ({
  // Add Book Dialog
  isAddBookDialogOpen: false,
  showAddBookDialog: () => set({ isAddBookDialogOpen: true }),
  closeAddBookDialog: () => set({ isAddBookDialogOpen: false }),
  // Edit Book Dialog
  isEditBookDialogOpen: false,
  editBookId: null,
  showEditBookDialog: (id: string) =>
    set({ isEditBookDialogOpen: true, editBookId: id }),
  closeEditBookDialog: () =>
    set({ isEditBookDialogOpen: false, editBookId: null }),
  // Book List
  bookList: [],
  setBookList: (bookList: BookDoc[]) => set({ bookList }),
  // Book Update
  onBookUpdate: (book: BookDoc) =>
    set((state) => ({
      bookList: state.bookList.map((b: BookDoc) =>
        b.id === book.id ? book : b,
      ),
    })),
  // Book Create
  onBookCreate: (book: BookDoc) =>
    set((state) => ({
      bookList: [book, ...state.bookList],
    })),
  // Book Delete
  onBookDelete: (id: string) =>
    set((state) => ({
      bookList: state.bookList.filter((b: BookDoc) => b._id !== id),
    })),
}))
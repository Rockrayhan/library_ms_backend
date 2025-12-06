import { Book } from "./books.model";

export const BooksService = {
  // Create book
  createBook: async (payload: any) => {
    if (payload.availableCopies === 0) payload.available = false;
    return Book.create(payload);
  },

  // Get all books
  getAllBooks: async (query: any) => {
    const filterGenre = query.filter as string;
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sort || "desc";
    const limit = parseInt(query.limit as string) || 10;

    // filter
    let filter: any = {};
    if (filterGenre) filter.genre = filterGenre;

    // sorting
    const sortCondition: any = {};
    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;

    return Book.find(filter).sort(sortCondition).limit(limit);
  },

  // Get single book
  getSingleBook: async (bookId: string) => {
    return Book.findById(bookId);
  },

  // Update book
  updateBook: async (bookId: string, payload: any) => {
    if ("availableCopies" in payload) {
      const availableCopies = Number(payload.availableCopies);
      payload.available = availableCopies > 0;
    }

    return Book.findByIdAndUpdate(bookId, payload, {
      new: true,
    });
  },

  // Delete book
  deleteBook: async (bookId: string) => {
    return Book.findByIdAndDelete(bookId);
  },
};

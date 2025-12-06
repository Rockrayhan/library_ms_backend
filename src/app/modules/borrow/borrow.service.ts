// modules/borrow/borrow.service.ts

import { Borrow } from "./borrow.model";
import { Book } from "../books/books.model";

export const BorrowService = {
  // Create a borrow record
  createBorrow: async (payload: any) => {
    const { book: bookId, quantity, dueDate } = payload;

    // Check book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    // Try borrowing through instance method
    book.borrowBook(quantity);
    await book.save();

    return Borrow.create({ book: bookId, quantity, dueDate });
  },

  // Borrow summary with aggregation
  getBorrowSummary: async () => {
    return Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
  },
};

// borrow.service.ts
import { Borrow } from "./borrow.model";
import { User } from "../user/user.model";
import { Book } from "../books/books.model";
import { Types } from "mongoose";

export const BorrowService = {
  // =========================================================
  // CREATE BORROW
  // =========================================================
  createBorrow: async (payload: any) => {
    const { user: userId, book: bookId, quantity, dueDate } = payload;

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(bookId)) {
      throw new Error("Invalid user or book ID");
    }

    // Fetch user with subscription
    const user = await User.findById(userId).populate("subscription");
    if (!user) throw new Error("User not found");

    if (!user.subscription) {
      throw new Error("User does not have an active subscription");
    }

    const subscription: any = user.subscription;

    // Check borrow limit
    if (user.borrowedBooks + quantity > subscription.borrowLimit) {
      throw new Error(
        `Borrow limit exceeded. Upgrade your subscription plan`
      );
    }

    // Check book exists
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    // Check availability based on your model
    if (book.availableCopies < quantity) {
      throw new Error(
        `Only ${book.availableCopies} copies available for this book`
      );
    }

    // Use your instance method to reduce book quantity
    book.borrowBook(quantity);
    await book.save();

    // Increase user's borrowed count
    user.borrowedBooks += quantity;
    await user.save();

    // Create borrow record
    return Borrow.create({
      user: userId,
      book: bookId,
      quantity,
      dueDate,
      returned: false,
    });
  },

  // =========================================================
  // RETURN BORROWED BOOK
  // =========================================================
  returnBorrow: async (borrowId: string) => {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) throw new Error("Borrow record not found");

    if (borrow.returned) {
      throw new Error("Book already returned");
    }

    const user = await User.findById(borrow.user);
    const book = await Book.findById(borrow.book);

    if (!user || !book) throw new Error("User or book not found");

    // Increase available copies back
    book.availableCopies += borrow.quantity;

    if (book.availableCopies > 0) {
      book.available = true;
    }

    await book.save();

    // Decrease user borrowed count
    user.borrowedBooks -= borrow.quantity;
    if (user.borrowedBooks < 0) user.borrowedBooks = 0;
    await user.save();

    // Mark as returned
    borrow.returned = true;
    await borrow.save();

    return borrow;
  },

  // =========================================================
  // USER BORROW LIST
  // =========================================================
  getUserBorrows: async (userId: string) => {
    return Borrow.find({ user: userId }).populate("book");
  },

  // =========================================================
  // ALL BORROWS (ADMIN)
  // =========================================================
  getAllBorrows: async () => {
    return Borrow.find().populate("user book");
  },
};

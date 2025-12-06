// modules/borrow/borrow.controller.ts

import express, { Request, Response } from "express";
import { BorrowService } from "./borrow.service";

export const borrowRouter = express.Router();

// Create borrow
borrowRouter.post("/borrow", async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.createBorrow(req.body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error: any) {
    const message =
      error.message === "Book not found" || error.message.includes("Not enough")
        ? error.message
        : "Something went wrong";

    res.status(
      message === "Book not found" || message.includes("Not enough") ? 400 : 500
    ).json({
      success: false,
      message,
      error: error.message,
    });
  }
});

// Borrow summary
borrowRouter.get("/borrow", async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.getBorrowSummary();

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

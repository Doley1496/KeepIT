/* */

import express from "express";

const router = express.Router();

import {
  createTodoListController,
  getAllTodoListController,
  updateTodoListController,
  deleteTodoListController,
} from "../Controllers/todoListController.js";

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

router.post("/create-task", verifyJwtToken, createTodoListController);

router.get("/get-task/:id", verifyJwtToken, getAllTodoListController);

router.put("/update-task/:id", verifyJwtToken, updateTodoListController);

router.delete("/delete-task/:id", verifyJwtToken, deleteTodoListController);

export default router;

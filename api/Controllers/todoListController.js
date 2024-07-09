/* */

import userModel from "../Models/userModel.js";

import todoModel from "../Models/todoModel.js";

import { errorHandler } from "./../Middlewares/errorHandler.js";

/******************************************************************************* */
/***************************    1: Creating TodoList Controller       ********** */
/******************************************************************************* */

export const createTodoListController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { title, body, id } = req.body;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return next(
        errorHandler(401, "Please register first to create your todo list!")
      );
    }

    const CreateTodoList = await new todoModel({
      /* */

      title,
      body,
      userId: existingUser,

      /* */
    }).save();

    /* Then we will push the id of the created todo-list in the list field array of the 
       current existing user and save it. 
       Here CreateTodoList will contain the id of the current created todo-list.
    */

    existingUser.list.push(CreateTodoList);
    existingUser.save();

    res.status(200).json(CreateTodoList);

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/******************************************************************************* */
/***************************   2: Reading(get) All TodoList Controller  ******** */
/******************************************************************************* */

export const getAllTodoListController = async (req, res, next) => {
  /* */

  try {
    /* */

    const allTodos = await todoModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (allTodos.length !== 0) {
      /* */

      res.status(200).send({
        success: true,
        message: "All Todo-List Listed",
        allTodos,
      });

      /* */
    } else {
      /* */

      res.status(200).send({
        success: true,
        message: "No Todo-List Available",
      });

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/******************************************************************************** */
/***************************   3. Updating a Todo list   ************************ */
/******************************************************************************** */

export const updateTodoListController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { title, body, id } = req.body;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return res.status(200).send({
        success: true,
        message: "Please register first to update your todo list!",
      });
    }

    const updatedTodoList = await todoModel.findByIdAndUpdate(
      /* */

      /* We know the id is always present in req.params.id. */
      req.params.id,

      /* what we will update -> title and body. */
      { title, body },

      { new: true }

      /* */
    );

    res.status(200).send({
      success: true,
      message: "Todo list updated successfully",
      updatedTodoList,
    });

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/****************************************************************************** */
/***************************   4. Delete a Todo list.  ************************ */
/****************************************************************************** */

export const deleteTodoListController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { id } = req.body;

    const existingUser = await userModel
      .findOneAndUpdate(id, { $pull: { list: req.params.id } })
      .exec();

    if (existingUser) {
      /* */

      const deletedTodoList = await todoModel.findByIdAndDelete(req.params.id);

      res.status(200).send({
        success: true,
        message: "Successfully deleted the todo list",
        deletedTodoList,
      });

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

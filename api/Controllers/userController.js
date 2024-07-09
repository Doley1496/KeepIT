/* */

import userModel from "../Models/userModel.js";

import emailSubscriptionModel from "../Models/emailSubscriptionModel.js";

import bcryptjs from "bcryptjs";

import { errorHandler } from "./../Middlewares/errorHandler.js";

/**********************************************************************************************/
/**************************   1 : To Update the user-profile Controller ***********************/
/**********************************************************************************************/

export const updateUserProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    if (req.user.userId === req.params.id) {
      /* */

      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.id,

        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },

        { new: true }

        /* */
      );

      const { password, ...remainingDetails } = updatedUser._doc;

      res.status(200).json(remainingDetails);

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only update your own account!."));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/********************************************************************************************* */
/***************************   2 : To Delete the user-profile Controller ********************* */
/********************************************************************************************* */

export const deleteUserProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    if (req.user.userId === req.params.id) {
      /* */

      await userModel.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only delete your own account!"));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************* */
/**************************    3 : Creating Controller for Complain-messages  ******************** */
/************************************************************************************************* */

export const createEmailSubscriptionController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    const existingEmail = await emailSubscriptionModel.findOne({ email });

    if (existingEmail) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    /* Then we will create the new-user and save it. */
    const newEmail = new emailSubscriptionModel({
      email: email,
    });

    await newEmail.save();

    res.status(200).json(newEmail);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const GetSingleUserDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const email = req.params.email;

    const existingUser = await userModel.findOne({ email });

    res.status(200).send({
      success: true,
      message: "Successfully got the user",
      existingUser,
    });

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

import express from "express"
import usersController from "../../controllers/myUserController";
import { jwtCheck } from "../../middleware/auth";
import { jwtParse } from "../../middleware/auth";
import { validateMyUserRequest } from "../../middleware/validation";

const router = express.Router();

router.route('/')
    .post(jwtCheck, usersController.createUser)
    .put(jwtCheck, jwtParse, validateMyUserRequest, usersController.updateUser)

export default router;
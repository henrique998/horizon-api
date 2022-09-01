import { Router } from "express";

import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController";
import { FindAllAccountsController } from "../modules/account/FindAllAccounts/FindAllAccountsController";

const accountRoute = Router();

const createAccountController = new CreateAccountController();
const findAllAccountsController = new FindAllAccountsController();

accountRoute.get("/", findAllAccountsController.handle);
accountRoute.post("/", createAccountController.handle);

export { accountRoute as accountRoutes };

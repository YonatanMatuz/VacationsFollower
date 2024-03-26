import express, { Request, Response, NextFunction } from "express";
import UserModel from "../2-models/user-model";
import authService from "../5-services/auth-service";
import CredentialsModel from "../2-models/credentials-model";

const router = express.Router();

// POST register a new user
router.post("/register", async( request: Request, response: Response, next: NextFunction ) => {
    try {
       const user = new UserModel(request.body);
       user.validate();
       const token = await authService.register(user);
       response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// POST login user
router.post("/login", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const credentials = new CredentialsModel(request.body);
        credentials.validate();
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
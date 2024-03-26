import express, { Request, Response, NextFunction } from "express";
import VacationModel from "../2-models/vacation-model";
import dataService from "../5-services/data-service";
import imageHandler from "../4-utils/image-handler";
import verifyLogin from "../3-middleware/verify-login";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// GET fetches all vacations, verifys that user has a valid token
router.get("/vacations", verifyLogin , async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const vacations = await dataService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET fetches a specific vacation
router.get("/vacation/:vacationId([0-9]+)", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await dataService.getSpecificVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE deletes a specific vacation, verifys admin token
router.delete("/vacations/delete-vacation/:vacationId([0-9]+)", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const vacationId = +request.params.vacationId;
        await dataService.deleteVacation(vacationId);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

// POST adds a vacation, verifys admin token
router.post("/vacations/add-vacation", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files.image;
        const vacation = new VacationModel(request.body);
        vacation.validatePost();
        const addedVacation = await dataService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT updates a specific vacation, verifys admin token
router.put("/vacations/:vacationId([0-9]+)" , verifyAdmin , async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        request.body.vacationId = +request.params.vacationId;
        const vacation = new VacationModel(request.body);
        vacation.validatePut();
        const updatedVacation = await dataService.updateVacation(vacation);
        response.status(201).json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// GET fetches the vacations image
router.get("/vacations/images/:imageName", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
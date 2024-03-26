import express, { Request, Response, NextFunction } from "express";
import FollowerModel from "../2-models/follower-model";
import followerService from "../5-services/follower-service";

const router = express.Router();

// POST follow a vacation
router.post("/vacations/followers", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const follower = new FollowerModel(request.body);
        await followerService.followVacation(follower);
        response.status(201).json();
    }
    catch (err: any) {
        next(err);
    }
});

// GET checks if user is following a specific vacation
router.get("/vacations/following/:userId([0-9]+)/:vacationId([0-9]+)", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        const isFollowing = await followerService.isUserFollowing(userId, vacationId);
        response.json(isFollowing);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE unfollows a vacation
router.delete("/vacations/followers", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const follower = new FollowerModel(request.body);
        await followerService.unfollowVacation(follower);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
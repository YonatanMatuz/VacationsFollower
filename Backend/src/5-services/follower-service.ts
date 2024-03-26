import FollowerModel from "../2-models/follower-model";
import dal from "../4-utils/dal";

// Follow a vacation
async function followVacation(follower: FollowerModel): Promise<string> {
    const sql = `
        INSERT INTO vacationFollowers
        VALUES(?, ?)`;
    const result = await dal.execute(sql, [follower.userId, follower.vacationId]);
    return result;
}

// Check if user is following the targeted vacation
async function isUserFollowing(userId: number, vacationId: number): Promise<boolean> {
    const sql = `
        SELECT EXISTS(SELECT * FROM vacationFollowers
        WHERE userId = ?
        AND vacationId = ?)
        AS isFollowing`;
    const result = await dal.execute(sql,[userId, vacationId]);
    const isFollowing = result[0].isFollowing;
    return isFollowing === 1;
}

// Unfollow the vacation
async function unfollowVacation(follower: FollowerModel): Promise<void> {
    const sql = `
        DELETE FROM vacationFollowers
        WHERE userId = ?
        AND vacationId = ?`;
    await dal.execute(sql,[follower.userId, follower.vacationId]);
}

export default {
    followVacation,
    unfollowVacation,
    isUserFollowing
};
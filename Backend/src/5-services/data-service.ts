import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";

// Fetch all vacations, also returns followerCount property via internal function
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM vacations`;
    const vacations = await dal.execute(sql);

    // Get follower count before returning the array
    for (const vacation of vacations) {
      const followerCount = await getFollowerCount(vacation.vacationId);
      vacation.followerCount = followerCount;
    }
    return vacations;
  }

//  Internal use function, associates each vacation with its following user accordingly
async function getFollowerCount(vacationId: number): Promise<number> {
    const sql = `
        SELECT COUNT(userId) AS followerCount
        FROM vacationFollowers
        WHERE vacationId = ?`;
    const result = await dal.execute(sql,[vacationId]);
    return result[0]?.followerCount || 0;
  }

//  Fetch specific vacation
async function getSpecificVacation(vacationId: number): Promise<VacationModel> {
    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM vacations
        WHERE vacationId = ?`;
    const vacations = await dal.execute(sql,[vacationId]);
    const vacation = vacations[0];

    // Validation
    if(!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;
}

// Delete specific vacation
async function deleteVacation(vacationId: number): Promise<void> {
    const sql = `
        DELETE 
        FROM vacations
        WHERE vacationId = ?`;
   const deletedVacation = await dal.execute(sql,[vacationId]);

    // Validation
    if(!deletedVacation) throw new ResourceNotFoundError(vacationId);
}

// Add a vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // Disregard user inserted image name
    let imageName = null;

    // If image exists, save it and change the URL of the image
    if(vacation.image) {
        imageName = await imageHandler.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;    
    }
    const sql = `
        INSERT INTO vacations
        VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, imageName]);
    vacation.vacationId = result.insertId;

    // Delete returning image bytes
    delete vacation.image;
    return vacation;
}

// Update a specific vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Get the current image's name
    let imageName = await getVacationImageName(vacation.vacationId);

    // If user sends image, handle accordingly
    if(vacation.image) {
        imageName = await imageHandler.updateImage(vacation.image, imageName || undefined); 
    }
    vacation.imageUrl = appConfig.imagesUrl + imageName; 

    const sql = `
        UPDATE vacations
        SET destination = ?, description = ?, start = ?, end = ?, price = ?, imageName = ?
        WHERE vacationId = ? `;
    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, imageName, vacation.vacationId]);

    // Validation
    if(!vacation) throw new ResourceNotFoundError(vacation.vacationId);

    // delete returning image bytes
    delete vacation.image;
    return vacation;
}

// Internal use function for getting the database image name
async function getVacationImageName(vacationId: number): Promise<string> {
    const sql = `
        SELECT imageName
        FROM vacations
        WHERE vacationId = ?`;
    const vacations = await dal.execute(sql,[vacationId]);
    const vacation = vacations[0];
    if(!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}

export default {
    getAllVacations,
    getSpecificVacation,
    deleteVacation,
    addVacation,
    updateVacation,  
};
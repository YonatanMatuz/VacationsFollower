import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination:  string;
    public description: string;
    public start: string;
    public end: string;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;
    public followerCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start = vacation.start;
        this.end = vacation.end;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
        
    }

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().positive().integer(),
        destination: Joi.string().required().min(3).max(30),
        description: Joi.string().required().min(20).max(500),
        start: Joi.date().raw().required(),
        end: Joi.date().greater(Joi.ref('start')).raw().required().messages({ 
            'date.greater': 'End date must be higher than starting date'
        }),
        price: Joi.number().required().positive().integer().min(2).max(10000),
        imageUrl: Joi.optional(),
        image: Joi.optional(),
    });

    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().strict(true).required().min(3).max(30),
        description: Joi.string().required().min(20).max(500),
        start: Joi.date().min('now').raw().required().messages({ 
            'date.min': 'Starting date must higher than today'
        }),
        end: Joi.date().greater(Joi.ref('start')).raw().required().messages({ 
            'date.greater': 'End date must be higher than starting date'
        }),
        price: Joi.number().required().positive().integer().min(2).max(10000),
        imageUrl: Joi.string().optional(),
        image: Joi.required(),
    });

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;
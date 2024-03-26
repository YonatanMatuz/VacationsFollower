import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";
import Joi from "joi";

class UserModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId= user.roleId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(3).max(20),
        lastName: Joi.string().required().min(3).max(20),
        email: Joi.string().required().min(10).max(50),
        password: Joi.string().required().min(4),
        roleId: Joi.number().optional().integer().positive(),
    });

    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default UserModel;
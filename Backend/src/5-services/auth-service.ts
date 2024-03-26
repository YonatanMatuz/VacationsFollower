import { OkPacket } from "mysql";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";
import { ValidationError } from "../2-models/client-errors";

// Register function
async function register(user: UserModel): Promise<string> {

    // Check if email is taken
    const isTaken = await isEmailTaken(user.email);
    if(isTaken) throw new ValidationError("Email is already taken");

    // Hash
    user.password = cyber.hashPassword(user.password);

    // Default register into a user and insert to database
    user.roleId = RoleModel.User;
    const sql = `
        INSERT INTO users
        VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql,
         [user.firstName, user.lastName, user.email, user.password, user.roleId]);
    user.userId = result.insertId;

    // Create token and return
    const token = cyber.createToken(user);
    return token;
}

// Login function
async function login(credentials: CredentialsModel): Promise<string> {

    // Hash
    credentials.password = cyber.hashPassword(credentials.password);    
    
    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?`;
    const result = await dal.execute(sql,[credentials.email, credentials.password]);
    const user = result[0];

    // Validation
    if (!user) throw new ValidationError("Invalid email or password");

    const token = cyber.createToken(user);
    return token;
}

// Internal use function, checks if email is taken
async function isEmailTaken(email: string): Promise<boolean> {
    const sql = `
        SELECT EXISTS(SELECT *
        FROM users
        WHERE email = ?)
        AS isTaken`;
    const result = await dal.execute(sql,[email]);
    
    // Extract isTaken from the array and object returned from the query
    const isTaken = result[0].isTaken;
    return isTaken === 1;
}

export default {
    register,
    login
};
import { Request } from "express";
import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from "../2-models/role-model";
import crypto from "crypto";
import { ValidationError } from "../2-models/client-errors";

// Secret key generated for each token, nerdy LOTR refrence apologies in advance
const secretKey = "speak friend, and enter - Mellon";

// Create new token, expiration is set to 1 hour.
function createToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(container, secretKey, options)
    return token;
}

// Verify if token is valid, throw error depending on the case 
async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=>{

        // extract header
        const header = request.header("authorization");

        // if no header throw a error
        if(!header) {
            reject(new ValidationError("Incorrect user or password"))
            return;
        }

        // substring 7 because its always Bearer :
        const token = header.substring(7);
        if(!token) {
            reject(new ValidationError("Incorrect user or password"))
            return;
        }

        jwt.verify(token, secretKey, err => {
            if(err){
                reject(new Error("Invalid token"))
                return;
            }
            resolve(true);

        })

    });
}

// Verify admin, used in middleware to secure admin routes
async function verifyAdmin(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject)=>{

        // extract header
        const header = request.header("authorization");

        // if no header throw a error
        if(!header) {
            reject(new ValidationError("Incorrect user or password"))
            return;
        }

        // substring 7 because its always Bearer :
        const token = header.substring(7);
        if(!token) {
            reject(new ValidationError("Incorrect user or password"))
            return;
        }

        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if(err){
                reject(new Error("Invalid token"))
                return;
            }

            const user = container.user;

            if(user.roleId !== RoleModel.Admin) {
                reject(new ValidationError("Access denied"))
                return;
            }

            resolve(true);

        })

    });     
}

// Salt and Hash password
function hashPassword(plainText: string): string {
    const salt = "El@Psy!%Kongoroo";
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText;
}


export default {
    createToken,
    verifyToken,
    verifyAdmin,
    hashPassword
};
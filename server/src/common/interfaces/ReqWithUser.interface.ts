import { Request } from "express";
import { User } from "src/typeorm";
export default interface ReqWithUser extends Request {
    user: User;
}
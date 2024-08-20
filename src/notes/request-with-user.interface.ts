import { Request } from "express";

interface RequestWithUser extends Request {
    user: {
        id: string;
        username: string;
    }
}

export { RequestWithUser }
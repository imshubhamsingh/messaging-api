import env from "dotenv";
env.config();

export const PORT = process.env.PORT || 30105;
export const LIMIT = "100kb";
export const MONGOURL = process.env.DB;
export const SECRET = process.env.SECRET;
export const TOKENTIME = process.env.TOKENTIME; //30 days
export const SALT = process.env.SALT;

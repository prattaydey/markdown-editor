import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL: string = import.meta.env.REACT_APP_API_URL || "";

export default API_BASE_URL;

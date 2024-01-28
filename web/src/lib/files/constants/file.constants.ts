import { PORT } from "../../server.constants";

export const BASE_URL = "http://localhost:" + PORT + "/"
export const GET_URL = BASE_URL + "get/";
export const GET_DELETED_URL = BASE_URL + "get/trash";
export const POST_URL = BASE_URL + "post";
export const DOWNLOAD_URL = BASE_URL + "bucket/"
export const THUMBNAIL_URL = BASE_URL + "thumbs/";
export const DELETE_URL = BASE_URL + "delete/"
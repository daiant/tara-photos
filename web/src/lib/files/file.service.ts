import { Injectable } from "@angular/core";
import { FileType } from "./types/file.type";
import { DELETE_URL, DOWNLOAD_URL, GET_DELETED_URL, GET_URL, POST_URL, THUMBNAIL_URL } from "./constants/file.constants";
import { commonHeaders } from "../utils/headers/headers.utils";

@Injectable({ providedIn: 'root' })
export class FileService {
  async getById(id: number): Promise<FileType | null> {
    return await fetch(GET_URL + id, { headers: commonHeaders() }).then(response => response.ok ? response.json() : null).catch(error => {
      console.error(error);
      return null
    })
  }
  async getAll(): Promise<FileType[]> {
    return await fetch(GET_URL + "all", { headers: commonHeaders() }).then(response => response.ok ? response.json() : []).catch(error => {
      console.log(error);
      return []
    });
  }
  async getThumbnail(file: FileType | undefined) {
    if (!file) return new Promise(resolve => resolve(null));
    const url = file.Thumbnail.Valid ?
      THUMBNAIL_URL + file.Thumbnail.String :
      DOWNLOAD_URL + file.Filename;
    return await fetch(url, { headers: commonHeaders() }).then(response => response.ok ? response.blob() : null).catch(error => {
      console.log(error);
      return null
    })
  }
  async getImage(file: FileType | undefined) {
    if (!file) return new Promise(resolve => resolve(null));
    const url = DOWNLOAD_URL + file.Filename;
    return await fetch(url, { headers: commonHeaders() }).then(response => response.ok ? response.blob() : null).catch(error => {
      console.log(error);
      return null
    })
  }
  async getDeleted(): Promise<FileType[]> {
    return await fetch(GET_DELETED_URL, { headers: commonHeaders() }).then(response => response.ok ? response.json() : []).catch(error => {
      console.log(error);
      return []
    });
  }
  async uploadFile(formData: FormData): Promise<void> {
    return await fetch(POST_URL, { method: "POST", body: formData, headers: commonHeaders() }).then(response => {
      return;
    })
  }
  async uploadFiles(formData: FormData): Promise<void> {
    return await fetch(POST_URL + '/multiple', { method: "POST", body: formData, headers: commonHeaders() }).then(response => {
      return;
    })
  }
  async deleteFile(id: number): Promise<void> {
    await fetch(DELETE_URL + id, { headers: commonHeaders() })
    return;
  }
}
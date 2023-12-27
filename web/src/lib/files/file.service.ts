import { Injectable } from "@angular/core";
import { FileType } from "./types/file.type";
import { DELETE_URL, GET_DELETED_URL, GET_URL, POST_URL } from "./constants/file.constants";

@Injectable({ providedIn: 'root' })
export class FileService {
  async getById(id: number): Promise<FileType | null> {
    return await fetch(GET_URL + id).then(response => response.ok ? response.json() : null).catch(error => {
      console.error(error);
      return null
    })
  }

  async getAll(): Promise<FileType[]> {
    return await fetch(GET_URL + "all").then(response => response.ok ? response.json() : []).catch(error => {
      console.log(error);
      return []
    });
  }
  async getDeleted(): Promise<FileType[]> {
    return await fetch(GET_DELETED_URL).then(response => response.ok ? response.json() : []).catch(error => {
      console.log(error);
      return []
    });
  }
  async uploadFile(formData: FormData): Promise<void> {
    return await fetch(POST_URL, { method: "POST", body: formData }).then(response => {
      return;
    })
  }
  async uploadFiles(formData: FormData): Promise<void> {
    return await fetch(POST_URL + '/multiple', { method: "POST", body: formData }).then(response => {
      return;
    })
  }
  async deleteFile(id: number): Promise<void> {
    await fetch(DELETE_URL + id)
    return;
  }
}
import { Injectable } from "@angular/core";
import { FileType } from "../../types/file.type";

@Injectable({ providedIn: 'root' })
export class FileService {
  readonly BASE_URL = "http://localhost:80/"
  readonly URL = this.BASE_URL + "get/";
  readonly DOWNLOAD_URL = this.BASE_URL + "bucket/"
  async getById(id: number): Promise<FileType | null> {
    return await fetch(this.URL + id).then(response => response.ok ? response.json() : null).catch(error => {
      console.error(error);
      return null
    })
  }

  async getAll(): Promise<FileType[]> {
    return await fetch(this.URL + "all").then(response => response.ok ? response.json() : []).catch(error => {
      console.log(error);
      return []
    });
  }
  async uploadFile(formData: FormData): Promise<void> {
    return await fetch(this.BASE_URL + "post", { method: "POST", body: formData }).then(response => {
      return;
    })
  }
}
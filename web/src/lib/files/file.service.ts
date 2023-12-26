import { Injectable } from "@angular/core";
import { FileType } from "../../types/file.type";

@Injectable({ providedIn: 'root' })
export class FileService {
  readonly URL = "http://localhost:80/get/";
  async getById(id: number): Promise<string | null> {
    return await fetch(this.URL + id).then(response => response.ok ? response.json() : null).catch(error => {
      console.error(error);
      return null
    })
  }
}
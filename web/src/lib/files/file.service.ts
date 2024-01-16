import { EventEmitter, Injectable } from "@angular/core";
import { FileType } from "./types/file.type";
import { DELETE_URL, DOWNLOAD_URL, GET_DELETED_URL, GET_URL, POST_URL, THUMBNAIL_URL } from "./constants/file.constants";
import { commonHeaders } from "../utils/headers/headers.utils";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FileService {
  private _fileChanged = new BehaviorSubject<null>(null);
  fileChanges$ = this._fileChanged.asObservable();

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
  async getImage(filename: string) {
    const url = DOWNLOAD_URL + filename;
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
  async uploadFiles(formData: FormData): Promise<void> {
    return await fetch(POST_URL, { method: "POST", body: formData, headers: commonHeaders() }).then(response => {
      this._fileChanged.next(null);
      return;
    })
  }
  async deleteFile(id: number): Promise<void> {
    await fetch(DELETE_URL + id, { headers: commonHeaders() })
    this._fileChanged.next(null);
    return;
  }
}
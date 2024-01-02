export type FileType = {
  Id: number;
  Filename: string;
  Thumbnail: FileThumbnailType;
  Created_at: number;
}
export type FileThumbnailType = {
  String: string;
  Valid: boolean;
}
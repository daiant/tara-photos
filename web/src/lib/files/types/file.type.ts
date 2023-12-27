export type FileType = {
  Id: number;
  Filename: string;
  Thumbnail: FileThumbnailType;
  Created_at: string;
}
export type FileThumbnailType = {
  String: string;
  Valid: boolean;
}
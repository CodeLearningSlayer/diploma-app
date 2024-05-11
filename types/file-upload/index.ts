type IFileType = "video" | "image";

export interface IImage {
  src: string;
  srcset?: string;
  alt?: string;
}

export interface IVideo {
  src: string;
  thumbnail: string;
  mime?: string;
}

export interface IAttachedFile {
  type: IFileType;
  file: IImage | IVideo;
}

export interface UploadImageRequest {
  image: File;
  croppParams?: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

export interface UploadImageResponse {
  status: number;
  message: string;
  data: string;
}

export interface UploadMultipleImagesRequest {
  images: File[];
  temp: boolean;
}

export interface UploadMultipleVideosRequest {
  videos: File[];
  temp: boolean;
}

export type Videos = Array<{
  video: string;
  thumbnail: string;
}>;

export type Images = string[];

export interface UploadMultipleImagesResponse {
  images: Images;
}

export interface UploadMultipleVideosResponse {
  videos: Videos;
}

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

import HttpFactory from "..";
import type {
  UploadImageRequest,
  UploadImageResponse,
  UploadMultipleImagesRequest,
  UploadMultipleImagesResponse,
  UploadMultipleVideosRequest,
  UploadMultipleVideosResponse,
} from "~/api/specs/files";

const prefix = "/files";

export class FileService extends HttpFactory {
  public async UploadImage(req: UploadImageRequest): Promise<UploadImageResponse> {
    const formData = new FormData();

    formData.append("image", req.image);

    const res = await this.post<UploadImageResponse>(`${prefix}/upload/image`, formData, {
      ...(req.croppParams ? { query: req.croppParams } : {}),
    });
    return res;
  }

  public async UploadMultipleImages(
    req: UploadMultipleImagesRequest,
  ): Promise<UploadMultipleImagesResponse> {
    const formData = new FormData();

    req.images.forEach(img => {
      formData.append("images", img);
    });

    formData.append("temp", req.temp.toString());

    const res = await this.post<UploadMultipleImagesResponse>(
      `${prefix}/upload/image/multiple`,
      formData,
    );
    return res;
  }

  public async uploadMultipleVideos(
    req: UploadMultipleVideosRequest,
  ): Promise<UploadMultipleVideosResponse> {
    const formData = new FormData();

    req.videos.forEach(img => {
      formData.append("videos", img);
    });

    formData.append("temp", req.temp.toString());

    const res = await this.post<UploadMultipleVideosResponse>(
      `${prefix}/upload/video/multiple`,
      formData,
    );
    return res;
  }
}

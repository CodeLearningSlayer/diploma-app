import HttpFactory from "..";
import type { UploadImageRequest, UploadImageResponse } from "~/api/specs/files";

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
}

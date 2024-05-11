import { type IAttachedFile } from "~/types/file-upload";
export const createMediaFilePreview = (
  file: File[],
  fileType: "image" | "video",
): IAttachedFile[] => {
  return file
    .filter(item => item.type.includes(fileType))
    .map(item => {
      if (fileType === "image") {
        return { type: fileType, file: { src: URL.createObjectURL(item) } };
      } else {
        return {
          type: fileType,
          file: {
            mime: item.type,
            src: URL.createObjectURL(item),
            thumbnail: "https://www.drupal.org/files/project-images/aee1538.jpg",
          },
        };
      }
    });
};

export const createSingleMediaPreview = (file: File): IAttachedFile => {
  if (file.type.includes("image")) {
    return { type: "image", file: { src: URL.createObjectURL(file) } };
  } else {
    return {
      type: "video",
      file: {
        mime: file.type,
        src: URL.createObjectURL(file),
        thumbnail: "https://www.drupal.org/files/project-images/aee1538.jpg",
      },
    };
  }
};

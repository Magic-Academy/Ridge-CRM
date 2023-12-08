import { useEffect, useState } from "react";
import avatarUploadService from "../../services/upload/avatart-upload.service";

const useGetUserAvatar = (userId) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserAvatar = async (userId) => {
    try {
      const { content } = await avatarUploadService.get(userId);
      const contentLength = content.byteLength;

      if (contentLength) {
        const arrayBuffer = new Uint8Array(content);
        const base64ImageString = btoa(
          String.fromCharCode.apply(null, arrayBuffer)
        );
        const srcValue = "data:image/png;base64," + base64ImageString;
        setIsLoading(false);
        setAvatarSrc(srcValue);
      } else {
        setAvatarSrc(null);
      }
    } catch (error) {}
  };

  const refreshAvatar = () => {
    getUserAvatar(userId);
  };

  useEffect(() => {
    getUserAvatar(userId);
  }, [userId]);

  return { avatarSrc, isLoading, refreshAvatar };
};

export default useGetUserAvatar;

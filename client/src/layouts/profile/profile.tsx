import { useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import Avatar from "./components/avatar";
import UserProfileInfo from "./components/user-profile-info";
import { ContainerStyled } from "@components/common/container/container-styled";
// store
import { getCurrentUserData, getUserNameById } from "@store/user/users.store";
import { getUserAvatarsLoadingStatus } from "@store/avatar/avatar.store";
// icons
import ProfileButtons from "./components/profile-buttons";
import EmailConfirmInfo from "./components/email-confirm-info";

const Profile = () => {
  const [state, setState] = useState({
    avatarUpdatePage: false,
    openDialog: false,
    updateProfilePage: false,
    updatePasswordPage: false
  });

  const user = useSelector(getCurrentUserData());
  const isUserLoading = useSelector(getUserAvatarsLoadingStatus());
  const userNameSelector = useSelector(getUserNameById(user?._id));

  return (
    <ContainerStyled>
      <HeaderLayout
        title={`Мой профиль: ${
          !isUserLoading ? userNameSelector : "загрузка..."
        }`}
      />
      <ProfileButtons setState={setState} />
      <EmailConfirmInfo user={user} />
      <Avatar state={state} setState={setState} />
      <UserProfileInfo user={user} />

      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
};

export default Profile;

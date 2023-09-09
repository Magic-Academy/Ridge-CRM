import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateLastContact from "../../../pages/update-last-contact/update-last-contact";
import {
  getUpdateRidgeLastContactOpenState,
  setUpdateRidgeLastContactOpenState,
} from "../../../../store/ridge-last-contact/update-ridge-last-contact.store";
import UpdateRidgeLastContact from "../../../pages/update-ridge-last-contact/update-ridge-last-contact";

const RidgeLastContactUpdateDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateMeeting = useSelector(getUpdateRidgeLastContactOpenState());

  const handleCloseUpdate = () => {
    dispatch(setUpdateRidgeLastContactOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateRidgeLastContact onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdateMeeting}
      fullWidth={false}
    />
  );
};

export default RidgeLastContactUpdateDialog;

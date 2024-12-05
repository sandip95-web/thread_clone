import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editProfileModal } from "../../redux/slice";
import { useParams } from "react-router-dom";
import {
  useUpdateProfileMutation,
  useUserDetailsQuery,
} from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../common/Loading";

const EditProfile = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [pic, setPic] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const { id } = useParams();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { openEditProfileModal, myInfo } = useSelector(
    (state: RootState) => state.service
  );
  const [updateProfile, updateProfileData] = useUpdateProfileMutation();
  const { refetch } = useUserDetailsQuery(id!);
  const dispatch = useDispatch();

  const handlePhoto = () => {
    imgRef.current?.click();
  };
  const handleClose = () => {
    dispatch(editProfileModal(false));
  };
  const handleUpdate = async () => {
    if (pic || bio) {
      const formData = new FormData();

      // Append the text field
      if (bio) {
        formData.append("text", bio);
      }
  
      // Append the media file if it exists and is a File
      if (pic instanceof File) {
        formData.append("media", pic);
      }
      await updateProfile(formData);
    }
    dispatch(editProfileModal(false));
  };

  useEffect(() => {
    if (updateProfileData.isSuccess) {
      refetch();
      toast.success(updateProfileData.data.message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (updateProfileData.isError) {
      toast.error("Error editing profile.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [updateProfileData.isError, updateProfileData.isSuccess]);
  return (
    <>
      <Dialog
        open={openEditProfileModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        {updateProfileData.isLoading ? (
          <Stack height={"60vh"}>
            <Loading />
          </Stack>
        ) : (
          <>
            <Box
              position={"absolute"}
              top={20}
              right={20}
              onClick={handleClose}
            >
              <RxCross2 size={28} className="image-icon" />
            </Box>
            <DialogTitle textAlign={"center"} mb={5}>
              Edit Profile
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection={"column"} gap={1}>
                <Avatar
                  src={
                    pic
                      ? URL.createObjectURL(pic)
                      : myInfo
                      ? myInfo.profilePic
                      : ""
                  }
                  alt={myInfo ? myInfo.username : ""}
                  sx={{ width: 96, height: 96, alignSelf: "center" }}
                />
                <Button
                  size="large"
                  sx={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    width: 96,
                    height: 40,
                    alignSelf: "center",
                    my: 2,
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={handlePhoto}
                >
                  Change
                </Button>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  ref={imgRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPic(e.target.files[0]);
                    }
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  Username
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.username : ""}
                  readOnly
                  className="text1"
                />
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  email
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.email : ""}
                  readOnly
                  className="text1"
                />
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  Bio
                </Typography>
                <input
                  type="text"
                  className="text1"
                  placeholder={myInfo ? myInfo.bio : ""}
                  value={bio ? bio : ""}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Stack>
              <Button
                size="large"
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  bgcolor: "GrayText",
                  color: "white",
                  width: "100%",
                  my: 2,
                  fontSize: "1.2rem",
                  ":hover": { cursor: "pointer", bgcolor: "gray" },
                }}
                onClick={handleUpdate}
              >
                {" "}
                Update{" "}
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EditProfile;

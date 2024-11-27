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
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [pic, setPic] = useState<File | null>(null);
  const [bio, setBio] = useState('');

  const params = useParams();
  const imgRef = useRef<HTMLInputElement | null>(null);

  const handlePhoto = () => {
    imgRef.current.click();
  };
  const handleClose = () => {};
  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        <Box position={"absolute"} top={20} right={20}>
          <RxCross2 size={28} className="image-icon" />
        </Box>
        <DialogTitle textAlign={"center"} mb={5}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <Stack flexDirection={"column"} gap={1}>
            <Avatar
              src={pic ? URL.createObjectURL(pic) : ""}
              alt=""
              sx={{
                width: 96,
                height: 96,
                alignSelf: "center",
              }}
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
            <input type="text" value={"sandip"} readOnly className="text1" />
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
                  value={"sandip"}
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
              placeholder={"sandip"}
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
            // onClick={handleUpdate}
          >
            {" "}
            Update{" "}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;

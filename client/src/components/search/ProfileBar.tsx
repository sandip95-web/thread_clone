import {
  Stack,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FC } from "react";
import { SearchUserProp } from "../../redux/types";
import { Link } from "react-router-dom";

const ProfileBar:FC<SearchUserProp> = ({user}) => {
  const { darkMode } = useSelector((state: RootState) => state.service);

  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <Stack
    flexDirection={"row"}
    justifyContent={"space-between"}
    px={1}
    py={2}
    mx={"auto"}
    boxShadow={"5px 5px 5px gray"}
    width={_700 ? "80%" : "90%"}
    maxWidth={"700px"}
    borderRadius={"15px"}
    sx={{ ":hover": { cursor: "pointer" } }}
  >
    <Stack flexDirection={"row"} gap={2}>
      <Avatar src={user ? user.profilePic : ""} alt={user ? user.username : ""} />
      <Stack flexDirection={"column"}>
        <Link to={`/profile/threads/${user?._id}`} className="link">
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontSize={_700 ? "1rem" : "0.9rem"}
          >
            {user ? user.username : ""}
          </Typography>
        </Link>
        <Typography
          variant="caption"
          fontSize={_700 ? "1.1rem" : "0.75rem"}
          color={"gray"}
        >
          {user ? user.bio : ""}
        </Typography>
        <Typography variant="caption" fontSize={_700 ? "1rem" : "0.9rem"}>
          {user ? user.followers.length : 0} followers
        </Typography>
      </Stack>
    </Stack>
    <Link to={`/profile/threads/${user._id}`} className="link">
      <Button
        size="medium"
        sx={{
          border: "1px solid gray",
          color: darkMode ? "whitesmoke" : "black",
          borderRadius: "10px",
          p: 2,
          height: 40,
        }}
      >
        Follow
      </Button>
    </Link>
  </Stack>
  );
};

export default ProfileBar;

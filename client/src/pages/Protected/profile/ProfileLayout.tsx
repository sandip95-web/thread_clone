import { Avatar, Button, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FaInstagram } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout: FC = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        m={2}
        width={"800px"}
        mx={"auto"}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack flexDirection={"column"} gap={1}>
            <Typography variant="h2" fontWeight={"bold"} fontSize={2}>
              Sandip_123
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography variant="h2" fontSize={1}>
                Sandip_123
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{ fontSize: "0.8rem" }}
              />
            </Stack>
          </Stack>
          <Avatar src="" alt="" sx={{ width: 60, height: 60 }} />
        </Stack>
        <Typography variant="subtitle2">This is a bio!</Typography>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="subtitle2" color="gray">
            2000 followers
          </Typography>
          <FaInstagram size={40} />
        </Stack>
      </Stack>
      <Button
        size="large"
        sx={{
          color: "black",
          width: "800px",
          mx: "auto",
          textAlign: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        Edit Profile
      </Button>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        my={5}
        pb={4}
        borderBottom={"2px solid gray"}
        fontSize={"1.2rem"}
        width={"800px"}
        mx={"auto"}
      >
        <Link to={"/profile/threads/1"} className="link">
          Threads
        </Link>
        
        <Link to={"/profile/replies/1"} className="link">
          Replies
        </Link>
        
        <Link to={"/profile/reposts/1"} className="link">
          Repost
        </Link>
      </Stack>
      <Outlet/>
    </>
  );
};

export default ProfileLayout;
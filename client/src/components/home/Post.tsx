import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { IoIosMore } from "react-icons/io";
import PostOne from "./post/PostOne";
import PostTwo from "./post/PostTwo";

const Post: FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _300 = useMediaQuery("(min-width:300px)");
  return (
    <>
      <Stack
        flexDirection={"row"}
        width={_700 ? "70%" : _300 ? "90%" : "100%"}
        justifyContent={"space-between"}
        borderBottom={"3px solid gray"}
        p={_700 ? 2 : _400 ? 1 : "5px"}
        mx={"auto"}
        sx={{
          ":hover": {
            cursor: "pointer",
            boxShadow: _700 ? "10px 10px 10px gray" : "",
          },
          transition: "all ease-in-out 0.3s",
        }}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <PostOne />
          <PostTwo />
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1rem"}
        >
          <Typography
            variant="caption"
            color="GrayText"
            fontSize={"1rem"}
            position={"relative"}
            top={2}
          >
            24hr
          </Typography>
          <IoIosMore size={_700 ? 28 : 20} />
        </Stack>
      </Stack>
    </>
  );
};

export default Post;

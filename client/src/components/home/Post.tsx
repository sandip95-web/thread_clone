import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addPostId, toggleMyMenu } from "../../redux/slice";
import { RootState } from "../../redux/store";

import PostOne from "./post/PostOne";
import PostTwo from "./post/PostTwo";
import { PostProps } from "../../redux/types";

const Post: FC<PostProps> = ({ post }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const _700 = useMediaQuery("(min-width:700px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _300 = useMediaQuery("(min-width:300px)");
  const dispatch = useDispatch();
  const { darkMode, myInfo } = useSelector((state: RootState) => state.service);

  const handleOpenMenu = (e: React.MouseEvent<SVGElement>) => {
    dispatch(addPostId(post._id));
    dispatch(toggleMyMenu(e.currentTarget));
  };

  const checkIsAdmin = () => {
    if (post?.admin._id === myInfo?._id) {
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    if (post && myInfo) {
      checkIsAdmin();
    }
  }, [post, myInfo]);

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
          <PostOne post={post} />
          <PostTwo post={post} />
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1rem"}
        >
          <Typography
            variant="caption"
            color={darkMode ? "white" : "GrayText"}
            fontSize={"1rem"}
            position={"relative"}
            top={2}
          >
            24hr
          </Typography>
          {isAdmin ? (
            <IoIosMore size={_700 ? 28 : 20} onClick={handleOpenMenu} />
          ) : (
            <IoIosMore size={_700 ? 28 : 20} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Post;

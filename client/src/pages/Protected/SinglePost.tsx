import { Stack, TextField } from "@mui/material";
import { FC } from "react";
import Post from "../../components/home/Post";
import Comment from "../../components/home/post/Comment";

const SinglePost: FC = () => {
  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        <Post />
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          <Comment />
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={{ width: "50%", mx: "auto", my: 5, p: 1 }}
        />
      </Stack>
    </>
  );
};

export default SinglePost;

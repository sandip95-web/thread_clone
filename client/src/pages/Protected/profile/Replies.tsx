import { Stack, useMediaQuery } from "@mui/material";
import { FC } from "react";
import Comment from "../../../components/home/post/Comment";

const Replies: FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Comment />
      </Stack>
    </>
  );
};

export default Replies;

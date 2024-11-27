import { Stack } from "@mui/material";
import { FC } from "react";
import Post from "../../../components/home/Post";

const Threads: FC = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={"800px"}
        mx={"auto"}
      >
        <Post />
      </Stack>
    </>
  );
};

export default Threads;

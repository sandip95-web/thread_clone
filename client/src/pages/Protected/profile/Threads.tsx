import { Stack, useMediaQuery } from "@mui/material";
import { FC } from "react";
import Post from "../../../components/home/Post";
import { useAllPostQuery } from "../../../redux/service";

const Threads: FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const data= useAllPostQuery("1");
  
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Post />
      </Stack>
    </>
  );
};

export default Threads;

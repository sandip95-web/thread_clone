import { Stack } from "@mui/material";
import { FC } from "react";
import Input from "../../components/home/Input";

const Home: FC = () => {
  return (
    <>
      <Input/>
      <Stack flexDirection={"column"} gap={2} mb={10}>
        <h1>Post</h1>
        <h1>Post</h1>
        <h1>Post</h1>
        <h1>Post</h1>
        <h1>Post</h1>
      </Stack>
    </>
  );
};

export default Home;

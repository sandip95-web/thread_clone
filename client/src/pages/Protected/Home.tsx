import { Button, Stack } from "@mui/material";
import { FC } from "react";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";

const Home: FC = () => {
  return (
    <>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Stack>
      <Button
        size="large"
        sx={{
          my: 5,
          p: 3,
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >Load more</Button>
    </>
  );
};

export default Home;

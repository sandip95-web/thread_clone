import { Stack } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

const ProtectedLayout: FC = () => {
  return (
    <Stack
      flexDirection={"column"}
      maxWidth={"800px"}
      minWidth={"100%"}
      mx={"auto"}
      overflow={"hidden"}
    >
      <Header/>
      <Outlet/>
    </Stack>
  );
};

export default ProtectedLayout;

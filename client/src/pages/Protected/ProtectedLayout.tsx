import { Stack, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import EditProfile from "../../components/modals/EditProfile";
import MainMenu from "../../components/menu/MainMenu";
import AddPost from "../../components/modals/AddPost";
import MyMenu from "../../components/menu/MyMenu";

const ProtectedLayout: FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <Stack
      flexDirection={"column"}
      maxWidth={_700 ? "800px" : "90%"}
      minWidth={"100%"}
      mx={"auto"}
      overflow={"hidden"}
    >
      <Header />
      <AddPost/>
      <MainMenu/>
      <MyMenu/>
      <EditProfile/>
      <Outlet />
    </Stack>
  );
};

export default ProtectedLayout;

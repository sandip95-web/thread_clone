import { Stack, useMediaQuery } from "@mui/material";
import Logo from "../../assets/Threads-logo-white-bg.png";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import Grid from "@mui/material/Grid2";
import ThreadLogo from "../../assets/Threads-logo-white-bg.png";
import { useDispatch } from "react-redux";

import { toggleMainMenu } from "../../redux/slice";
const Header = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const dispatch = useDispatch();

  const handleOpenMainMenu = (e: React.MouseEvent<SVGElement>) => {
  
    dispatch(toggleMainMenu(e.currentTarget));
    
  };

  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          height={"52"}
          justifyContent={"space-around"}
          alignItems={"center"}
          position={"sticky"}
          top={"0"}
          py={"1"}
        >
          <img src={Logo} alt="logo" height={48} width={80} />

          <Stack
            justifyContent={"center"}
            width={"550px"}
            bgcolor={"aliceblue"}
            zIndex={2}
            height={96}
          >
            <Navbar />
          </Stack>
          <IoMenu
            size={35}
            className="menu-icon"
            color="gray"
            cursor={"pointer"}
            onClick={handleOpenMainMenu}
          />
        </Stack>
      ) : (
        <>
          <Stack
            position={"fixed"}
            bottom={0}
            justifyContent={"center"}
            width={"100%"}
            height={52}
            p={1}
            bgcolor={"aliceblue"}
            zIndex={2}
          >
            <Navbar />
          </Stack>
          <Grid
            container
            height={60}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Grid size={{ xs: 6 }}>
              <img src={ThreadLogo} alt="logo" width={60} height={35} />
            </Grid>
            <IoMenu
              size={35}
              className="menu-icon"
              color="gray"
              onClick={handleOpenMainMenu}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Header;

import { Stack } from "@mui/material";
import Logo from "../../assets/Threads-logo-white-bg.png";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
const Header = () => {
  return (
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
      <IoMenu size={35} className="menu-icon" />
    </Stack>
  );
};

export default Header;

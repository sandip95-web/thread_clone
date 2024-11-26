import { Stack } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        maxWidth={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Link to="/">
          <GoHomeFill size={32} />
        </Link>
        <Link to="/search">
          <IoIosSearch size={32} />
        </Link>
        <TbEdit size={32} />
        <CiHeart size={32} />
        <Link to={"/profile/threads/1"}>
          <RxAvatar size={32} />
        </Link>
      </Stack>
    </>
  );
};

export default Navbar;

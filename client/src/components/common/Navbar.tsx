import { Stack, useMediaQuery } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addPostModal } from "../../redux/slice";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state:RootState) => state.service);

  const handleAddPost = () => {
    dispatch(addPostModal(true));
  };

  const _300 = useMediaQuery("(min-width:300px)");

  return (
    <>
      <Stack
        flexDirection={"row"}
        maxWidth={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <FiArrowLeft
          size={_300 ? 32 : 24}
          color={darkMode  ? 'white' : 'black'}
          className="image-icon"
        />
        <Link to="/" className="link">
          <GoHomeFill size={_300 ? 32 : 24} color={darkMode  ? 'white' : 'black'} />
        </Link>
        <Link to="/search" className="link">
          <IoIosSearch size={_300 ? 32 : 24} color={darkMode  ? 'white' : 'black'} />
        </Link>
        <TbEdit
          size={_300 ? 32 : 24}
          color={darkMode  ? 'white' : 'black'}
          className="image-icon"
          onClick={handleAddPost}
        />
        <CiHeart size={_300 ? 32 : 24} color={darkMode  ? 'white' : 'black'} className="image-icon" />
        <Link to={"/profile/threads/1"} className="link">
          <RxAvatar size={_300 ? 32 : 24} color={darkMode  ? 'white' : 'black'} />
        </Link>
      </Stack>
    </>
  );
};

export default Navbar;

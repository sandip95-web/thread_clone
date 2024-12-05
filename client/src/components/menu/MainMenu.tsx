import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { addMyInfo, toggleMainMenu, toggleTheme } from "../../redux/slice";
import { useLogoutMutation } from "../../redux/service";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";

const MainMenu = () => {
  const { anchorE1,myInfo } = useSelector((state: RootState) => state.service);
  const [logoutUser, logOutUserData] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };

  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    handleClose();
    dispatch(addMyInfo(null));
    await logoutUser();
    window.location.reload();
  };
  useEffect(() => {
    if (logOutUserData.isSuccess) {
      toast.warning(logOutUserData.data.message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (logOutUserData.isError) {
      toast.error("Error while logging out.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [logOutUserData.isSuccess, logOutUserData.isError]);
  return (
    <>
      <Menu
        anchorEl={anchorE1}
        open={anchorE1 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;

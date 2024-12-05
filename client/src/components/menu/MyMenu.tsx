import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { RootState } from "../../redux/store";
import { useDeletePostMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import { useEffect } from "react";

const MyMenu = () => {
  const { anchorE2,postId } = useSelector((state:RootState) => state.service);
  const dispatch = useDispatch();
  const [deletePost, deletePostData] = useDeletePostMutation();
  const handleClose = () => {
    dispatch(toggleMyMenu(null));
  };
  const handleDeletePost = async () => {
    handleClose();
    
    await deletePost(postId!);
  };
  useEffect(() => {
    if (deletePostData.isSuccess) {
      toast.warning("Post Deleted.", {
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
    if (deletePostData.isError) {
      toast.error("Error while deleting Post", {
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
  }, [deletePostData.isSuccess, deletePostData.isError]);

  return (
    <>
      <Menu
        anchorEl={anchorE2}
        open={anchorE2 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default MyMenu;

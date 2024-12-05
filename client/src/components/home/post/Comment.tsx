import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CommentProps } from "../../../redux/types";
import { useDeleteCommentMutation, useSinglePostQuery } from "../../../redux/service";
import { Bounce, toast } from "react-toastify";

const Comment: FC<CommentProps> = ({comment,postId}) => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { darkMode,myInfo } = useSelector((state: RootState) => state.service);
  const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const { refetch } = useSinglePostQuery(postId);
  
  

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = async () => {
    const info = {
      postId,
      id: comment?._id,
    };
    await deleteComment(info);
    handleClose();
    refetch();
  };
  const checkIsAdmin = () => {
    if (comment && myInfo) {
      if (comment.admin._id === myInfo._id) {
        setIsAdmin(true);
        return;
      }
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      toast.success(deleteCommentData.data.message, {
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
    if (deleteCommentData.isError) {
      toast.error("An Error Occured.", {
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
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);
  return (
    <>
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      px={2}
      pb={4}
      borderBottom={"1px solid gray"}
      mx={"auto"}
      width={"90%"}
    >
      <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
        <Avatar
          src={comment ? comment.admin.profilePic : ""}
          alt={comment ? comment.admin.username : ""}
        />
        <Stack flexDirection={"column"}>
          <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
            {comment ? comment.admin.username : ""}
          </Typography>
          <Typography variant="subtitle2" fontSize={"0.9rem"}>
            {comment ? comment.text : ""}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"center"}
        color={darkMode ? "white" : "GrayText"}
        fontSize={"0.9rem"}
      >
        <p>24min</p>
        {isAdmin ? (
          <IoIosMore
            size={_700 ? 28 : 20}
            className="image-icon"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        ) : (
          <IoIosMore size={_700 ? 28 : 20} className="image-icon" />
        )}
      </Stack>
    </Stack>
    <Menu
      anchorEl={anchorEl}
      open={anchorEl !== null ? true : false}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
    </Menu>
  </>
  );
};

export default Comment;

import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Comment: FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { darkMode } = useSelector((state: RootState) => state.service);
  const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);
  const handleOpenMenu = (e: React.MouseEvent<SVGElement>) => {
    setAnchorEl(e?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = () => {};
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
          <Avatar src="" alt="" />
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
              Sandip_123
            </Typography>
            <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
              This is awesome
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
          <IoIosMore size={_700 ? 28 : 20} className="image-icon" onClick={handleOpenMenu} />
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl ? true : false}
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

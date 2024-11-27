import { Menu, MenuItem } from "@mui/material";

const MyMenu = () => {
  const handleClose = () => {};
  const handleDeletePost = () => {};
  return (
    <>
      <Menu
        open={true}
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

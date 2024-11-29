import { InputAdornment, TextField } from "@mui/material";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SearchInput: FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.service);

  return (
    <>
      <TextField
        sx={{
          width: "90%",
          maxWidth: "750px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            color: darkMode ? "whitesmoke" : "black",

            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: darkMode ? "whitesmoke" : "black" }}
              >
                <FaSearch />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export default SearchInput;

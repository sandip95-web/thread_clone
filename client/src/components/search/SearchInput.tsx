import { InputAdornment, TextField } from "@mui/material";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput: FC = () => {
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
            color: "black",

            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{color:"black"}}>
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

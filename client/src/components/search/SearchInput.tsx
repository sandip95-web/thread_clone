import { InputAdornment, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLazySearchUserQuery } from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import { addToSearchedUsers } from "../../redux/slice";

const SearchInput: FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.service);
  const [query, setQuery] = useState<string>("");

  const [searchUser, searchUserData] = useLazySearchUserQuery();

  const dispatch = useDispatch(); 
 
  const handleSearch = async (e:React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (query && e?.key === "Enter") {
      await searchUser(query);
    }
  };
  useEffect(() => {
    if (searchUserData.isSuccess) {
      dispatch(addToSearchedUsers(searchUserData.data));
      toast.success("User Found", {
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
    if (searchUserData.isError) {
      toast.success("Error while searching user.", {
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
  }, [searchUserData.isSuccess, searchUserData.isError]);
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
      placeholder="search user..."
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
      onChange={(e) => setQuery(e.target.value)}
      onKeyUp={handleSearch}
    />
  </>
  );
};

export default SearchInput;

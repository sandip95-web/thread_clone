import { Stack, Typography } from "@mui/material";
import ProfileBar from "../../components/search/ProfileBar";
import SearchInput from "../../components/search/SearchInput";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Search = () => {
  const { searchedUsers } = useSelector((state:RootState) => state.service);
  return (
    <>  
      <SearchInput />
      <Stack
      flexDirection={"column"}
      gap={1}
      mb={5}
      width={"60%"}
      mx={"auto"}
      >
        {searchedUsers ? (
          searchedUsers.length > 0 ? (
            searchedUsers.map((user) => {
              return <ProfileBar key={user._id} user={user} />;
            })
          ) : (
            ""
          )
        ) : (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            Start searching...
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Search;

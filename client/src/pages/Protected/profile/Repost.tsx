import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/home/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Repost = () => {
  const { user } = useSelector((state:RootState) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      {user ? (
        user ? (
          user.reposts.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              width={_700 ? "800px" : "90%"}
              mx={"auto"}
            >
              {user.reposts.map((e) => {
                return <Post key={e._id} post={e} />;
              })}
            </Stack>
          ) : (
            <Typography textAlign={"center"} variant="h6">
              No Repost yet !
            </Typography>
          )
        ) : (
          <Typography textAlign={"center"} variant="h6">
            No Repost yet !
          </Typography>
        )
      ) : (
        <Typography textAlign={"center"} variant="h6">
          No Repost yet !
        </Typography>
      )}
    </>
  );
};

export default Repost;
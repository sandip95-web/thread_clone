import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/home/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Threads = () => {
  const { user } = useSelector((state:RootState) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      {user ? (
        user.threads ? (
          user.threads.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              width={_700 ? "800px" : "90%"}
              mx={"auto"}
            >
              {user.threads.map((e) => {
                return <Post key={e._id} post={e} />;
              })}
            </Stack>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              No Thread yet !
            </Typography>
          )
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Threads;
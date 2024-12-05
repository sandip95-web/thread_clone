import { Stack, Typography, useMediaQuery } from "@mui/material";

import { useSelector } from "react-redux";
import Comment from "../../../components/home/post/Comment";
import { RootState } from "../../../redux/store";

const Replies = () => {
  const { user } = useSelector((state:RootState) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        {user ? (
          user ? (
            user.replies.length > 0 ? (
              user.replies.map((e) => {
                return <Comment key={e._id} comment={e} postId={e.post} />;
              })
            ) : (
              <Typography textAlign={"center"} variant="h6">
                No Replies yet !
              </Typography>
            )
          ) : null
        ) : null}
      </Stack>
    </>
  );
};

export default Replies;
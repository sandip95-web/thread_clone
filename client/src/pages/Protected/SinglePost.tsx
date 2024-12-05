import { Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Post from "../../components/home/Post";
import Comment from "../../components/home/post/Comment";
import { useAddCommentMutation, useSinglePostQuery } from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";

const SinglePost: FC = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { data, refetch } = useSinglePostQuery(id!);
  const [addComment, addCommentData] = useAddCommentMutation();
  const handleAddComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (data && e.key === "Enter") {
      const info = {
        id: data.post._id,
        text: comment,
      };
      await addComment(info);
    }
  };

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComment("");
      refetch();
      toast.success(addCommentData.data.message, {
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
    if (addCommentData.isError) {
      toast.error("An error occurred", {
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
  }, [addCommentData.isSuccess, addCommentData.isError]);
  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        {data?.post ? (
          <Post post={data?.post} />
        ) : (
          <p>
            <Loading />
          </p>
        )}
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          {data
            ? data.post?.comments?.length > 0
              ? data.post.comments.map((comment) => {
                  return (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      postId={data?.post._id}
                    />
                  );
                })
              : null
            : null}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={{ width: "50%", mx: "auto", my: 5, p: 1 }}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}
          value={comment ? comment : ""}
        />
      </Stack>
    </>
  );
};

export default SinglePost;

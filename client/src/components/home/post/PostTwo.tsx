import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PostProps } from "../../../redux/types";
import { useLikePostMutation, useRepostMutation } from "../../../redux/service";
const PostTwo: FC<PostProps> = ({ post }) => {
  const { darkMode, myInfo } = useSelector((state: RootState) => state.service);
  const [likePost] = useLikePostMutation();
  const [repost, repostData] = useRepostMutation();
  const [isLiked, setIsLiked] = useState<boolean>();
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleLike = async () => {
    try {
      const response = await likePost(post?._id);
      console.log("Response from likePost:", response); // Check the response
      checkIsLiked();
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const checkIsLiked = () => {
    if (post?.likes.length > 0) {
      const variable = post.likes.filter(
        (ele: { _id: string }) => ele._id === myInfo?._id
      );

      if (variable.length > 0) {
        setIsLiked(true);
        return;
      }
    }
    setIsLiked(false);
  };

  const handleRepost = async () => {
    await repost({ id: post?._id });
  };

  useEffect(() => {
    checkIsLiked();
  }, [post]);
  return (
    <>
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.8rem"}
              fontWeight={"bold"}
            >
              {post ? post.admin.username : ""}
            </Typography>
            <Link to={`/post/${post?._id}`} className="link">
              <Typography
                variant="h5"
                fontSize={
                  _700 ? "1.2rem" : _400 ? "1rem" : _300 ? "0.9rem" : "0.8rem"
                }
                className={darkMode ? "mode" : ""}
              >
                {post ? post.text : ""}
              </Typography>
            </Link>
          </Stack>
          {post ? (
            post.media ? (
              <img
                src={post?.media}
                alt={post?.media}
                loading="lazy"
                width={
                  _700
                    ? "400px"
                    : _500
                    ? "350px"
                    : _400
                    ? "250px"
                    : _300
                    ? "180px"
                    : "150px"
                }
                height={"auto"}
              />
            ) : null
          ) : null}
        </Stack>
        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} m={1}>
            {isLiked ? (
              <FaHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
            ) : (
              <FaRegHeart
                size={_700 ? 32 : _300 ? 28 : 24}
                onClick={handleLike}
              />
            )}

            <Link to={`/post/${post?._id}#comment`} className="link">
              <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
            </Link>
            <FaRetweet
              size={_700 ? 32 : _300 ? 28 : 24}
              onClick={handleRepost}
            />
            <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            position={"relative"}
            top={-3}
            left={4}
          >
            {post ? (
              post.likes.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {post.likes.length} likes .
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {post ? (
              post.comments.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {post.comments.length} comment{" "}
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostTwo;

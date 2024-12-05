import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";
import { useAllPostQuery } from "../../redux/service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/common/Loading";

const Home: FC = () => {
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const { data, isLoading } = useAllPostQuery(page);
  const { posts } = useSelector((state: RootState) => state.service);
  console.log(posts)
  const handleClick = () => {
    setPage((pre) => pre + 1);
  };

  useEffect(() => {
    if (data) {
      if (data.posts.length < 3) {
        setShowMore(false);
      }
    }
  }, [data]);
  return (
    <>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post) => {
              return <Post key={post._id} post={post}  />;
            })
          ) : (
            <Typography variant="caption" textAlign={"center"}>
              No post yet !
            </Typography>
          )
        ) : isLoading ? (
          <Loading />
        ) : null}
      </Stack>

      {showMore ? (
        <Button
          size="large"
          sx={{ my: 5, p: 3, textDecoration: "underline", cursor: "pointer" }}
          onClick={handleClick}
        >
          Load More
        </Button>
      ) : (
        posts &&
        posts?.length > 0 && (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            You have reached the end !
          </Typography>
        )
      )}
    </>
  );
};

export default Home;

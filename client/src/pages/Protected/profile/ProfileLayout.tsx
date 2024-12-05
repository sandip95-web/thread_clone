import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModal } from "../../../redux/slice";

import { useEffect, useState } from "react";
import EditProfile from "../../../components/modals/EditProfile";
import { Bounce, toast } from "react-toastify";

import { RootState } from "../../../redux/store";
import {
  useFollowUserMutation,
  useUserDetailsQuery,
} from "../../../redux/service";
import { Helmet } from "react-helmet-async";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useUserDetailsQuery(id!);
  const [followUser, followUserData] = useFollowUserMutation();

  const { darkMode, myInfo } = useSelector((state: RootState) => state.service);

  const [myAccount, setMyAccount] = useState<boolean>();
  const [isFollowing, setIsFollowing] = useState<boolean>();

  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const checkIsFollowing = () => {
    if (data && myInfo) {
      const isTrue = data.data?.followers.filter((e) => e === myInfo._id);
      if (isTrue && isTrue.length > 0) {
        setIsFollowing(true);
        return;
      }
      setIsFollowing(false);
    }
  };

  const checkIsMyAccount = () => {
    if (data && myInfo) {
      const isTrue = data.data?._id === myInfo._id;
      setMyAccount(isTrue);
    }
  };

  const handleFollow = async () => {
    if (data && data.data?._id) {
      await followUser(data.data?._id);
    }
  };

  const handleOpenEditModal = () => {
    dispatch(editProfileModal(true));
  };

  useEffect(() => {
    if (followUserData.isSuccess) {
      toast.success(followUserData.data.message, {
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
    if (followUserData.isError) {
      toast.error("Error while following user.", {
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
  }, [followUserData.isSuccess, followUserData.isError]);

  useEffect(() => {
    checkIsFollowing();
    checkIsMyAccount();
  }, [data]);

  return (
    <>
      <Helmet>
        <title>
          {data
            ? data.data
              ? data.data.username + " | Threads Clone"
              : "Threads Clone | App by Aditya Jawanjal"
            : "Threads Clone | App by Aditya Jawanjal"}
        </title>
      </Helmet>
      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        m={2}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="h2"
              fontWeight={"bold"}
              fontSize={_300 ? "2rem" : "1rem"}
            >
              {data ? (data.data ? data.data.username : "") : ""}
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography variant="h2" fontSize={_300 ? "1rem" : "0.8rem"}>
                {data ? (data.data ? data.data.email : "") : ""}
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{ fontSize: _300 ? "0.8rem" : "0.6rem" }}
              />
            </Stack>
          </Stack>
          <Avatar
            src={data ? (data.data ? data.data.profilePic : "") : ""}
            alt={data ? (data.data ? data.data.username : "") : ""}
            sx={{ width: _300 ? 60 : 40, height: _300 ? 60 : 40 }}
          />
        </Stack>
        <Typography variant="subtitle2">
          {data ? (data.data ? data.data.bio : "") : ""}
        </Typography>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="subtitle2" color={"gray"}>
            {data
              ? data.data
                ? data.data.followers.length > 0
                  ? `${data.data.followers.length} followers`
                  : "No Followers"
                : ""
              : ""}
          </Typography>
          <FaInstagram size={_300 ? 40 : 24} />
        </Stack>
      </Stack>
      <Button
        size="large"
        sx={{
          color: darkMode ? "whitesmoke" : "black",
          width: _700 ? "800px" : "90%",
          mx: "auto",
          textAlign: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={myAccount ? handleOpenEditModal : handleFollow}
      >
        {myAccount ? " Edit Profile" : isFollowing ? "unfollow" : "Follow user"}
      </Button>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        my={5}
        pb={2}
        borderBottom={"2px solid gray"}
        fontSize={_500 ? "1.2rem" : _300 ? "1.1rem" : "0.9rem"}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Link
          to={`/profile/threads/${data?.data?._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
        >
          Threads
        </Link>
        <Link
          to={`/profile/replies/${data?.data?._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
        >
          Replies
        </Link>
        <Link
          to={`/profile/reposts/${data?.data?._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
        >
          Reposts
        </Link>
      </Stack>
      <Outlet />
      <EditProfile />
    </>
  );
};

export default ProfileLayout;

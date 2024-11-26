import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import ErrorImage from "../assets/error-bg.png";

const Error: FC = () => {
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          background: `url(${ErrorImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack
          p={5}
          border={"2px solid black"}
          bgcolor={"#FF8A8A"}
          borderRadius={"10px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          boxShadow={"5px 5px 5px white"}
        >
          <Typography variant="h3">OOp's</Typography>
          <Typography variant="h3">You Enter Wrong Location!</Typography>
          <Button
            size="large"
            sx={{
              bgcolor: "#88D66C",
              color: "whitesmoke",
              borderRadius: "10px",
              p: 2,
              ":hover":{
                bgcolor:'#F6FB7A',
                color:"black"
              }
            }}
            
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Error;

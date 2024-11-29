import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RegisterImage from "../assets/register-bg.webp";
import { useEffect, useState } from "react";
import { useSigninMutation } from "../redux/service";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const [login, setLogin] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, signInUserData] = useSigninMutation();
  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    console.log(data);
  };
  const handleRegister = async () => {
    const data = {
      username,
      email,
      password,
    };
    await signInUser(data);
  };
  useEffect(() => {
    if (signInUserData.isSuccess) {
      console.log("object");
      console.log(signInUserData.data);
    }
  }, [signInUserData.isSuccess]);
  const toggleLogin = () => {
    setLogin((prev) => !prev);
  };
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={
          _700
            ? {
                background: `url(${RegisterImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 600px",
              }
            : null
        }
      >
        <Stack
          flexDirection={"column"}
          width={_700 ? "40%" : "90%"}
          gap={2}
          mt={_700 ? 20 : 0}
        >
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with email" : "Resigter for new account"}
          </Typography>
          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            variant="outlined"
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: "#B1D690",
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "#77CDFF",
                cursor: "pointer",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Login" : "Sign Up"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1.3rem" : "1rem"}
            alignSelf={"center"}
          >
            {login ? "Don't have an account?" : "Already have an account?"}
            <span className="login-link" onClick={toggleLogin}>
              {" "}
              {login ? "Register" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;

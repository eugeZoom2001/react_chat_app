import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import ApiService from "./../api/apiCalls";
import Alerta from "../components/Alerta";
import Selector from "../components/Selector";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Chat_App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const Login = () => {
  const { updateUser } = useContext(AuthContext);
  const [usersAvailable, setUsersAvailable] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ name: "", email: "" });
  // useEffect(() => {
  //   console.log("inicio usersAvailable", usersAvailable);
  // });

  useEffect(() => {
    !usersAvailable && retrieveUsers();
  }, [usersAvailable]);

  const retrieveUsers = async () => {
    try {
      const response = await ApiService.getUsersAvailable(
        `${process.env.REACT_APP_SERVER}/usersAvailable`,
        "123"
      );
      //console.log(response.data);
      setUsersAvailable(response.data);
    } catch (error) {}
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = { user: data.get("name"), email: data.get("email") };
    ApiService.loginUser(user, "1234")
      .then((result) => {
        //console.log("result", result)
        updateUser(user.user);
      })
      .catch((err) => {
        console.log("error", err);
        setLoginError(true);
      });
  };

  const setUserAvailable = (user) => {
    //console.log("new value", user);
    if (!user) {
      setSelectedValue({ name: "", email: "" });
    } else {
      setSelectedValue({ name: user.user.trim(), email: user.email.trim() });
    }
  };

  const handleChange = (e) => {
    setSelectedValue({ ...selectedValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                autoComplete="email"
                value={selectedValue.email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                onChange={handleChange}
                value={selectedValue.name}
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {/* {loginError? (<Alerta text="Usuario Duplicado"/>):null} */}
              {loginError && (
                <Alerta textError="usuario invalido o duplicado" />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {usersAvailable && (
                <Selector
                  usersAvailable={usersAvailable}
                  setUserAvailable={setUserAvailable}
                />
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;

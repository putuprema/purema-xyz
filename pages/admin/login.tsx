import { SnackbarCloseReason, TextField, Typography } from "@material-ui/core";
import styles from "components/admin/AdminPage.module.scss";
import { Button } from "components/Button";
import Container from "components/container/Container";
import Snackbar from "components/Snackbar";
import { auth } from "config/firebase";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openSnackbar = (msg: string) => {
    setMessage(msg);
    setSnackbarOpen(true);
  };

  const closeSnackbar = (ev: React.SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    setTimeout(() => {
      setMessage("");
    }, 300);
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    setLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetFields();
      openSnackbar("Login success!. Redirecting you to dashboard...");

      router.push((router.query.redirect as string | undefined) || "/admin");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        openSnackbar("Wrong password.");
      } else {
        openSnackbar(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container compact className={styles["root"]}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={onSubmit}>
          <div className={styles["input"]}>
            <TextField
              required
              type="email"
              fullWidth
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <TextField
              required
              type="password"
              fullWidth
              variant="outlined"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <Button fullWidth type="submit" loading={loading}>
            Login
          </Button>
        </form>
        <Snackbar open={snackbarOpen} onClose={closeSnackbar} message={message} autoHideDuration={3000} />
      </Container>
    </>
  );
};

export default LoginPage;

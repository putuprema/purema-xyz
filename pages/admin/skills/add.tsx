import Container from "components/container/Container";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Input, SnackbarCloseReason, TextField, Typography } from "@material-ui/core";
import { Button } from "components/Button";
import styles from "components/admin/AdminPage.module.scss";
import Snackbar from "components/Snackbar";
import Head from "next/head";
import { Services } from "services";
import adminPageStyles from "components/admin/AdminPage.module.scss";
import { useRouter } from "next/router";

const AddSkillPage: NextPage = () => {
  const { skillService } = useContext(Services);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState<File>();

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

  const onIconFileChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      if (!file.name.match(/\.(svg|png)$/)) {
        openSnackbar("Only SVG and PNG files are supported");
        setIconFile(undefined);
      } else {
        setIconFile(file);
      }
    }
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!loading) {
      setLoading(true);

      try {
        if (!iconFile) {
          throw new Error("Skill icon file is required");
        }

        await skillService.add({ name, description, iconFile });
        openSnackbar("Skill successfully added");
        router.back();
      } catch (err) {
        openSnackbar(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add new skill</title>
      </Head>
      <Container compact className={`${adminPageStyles["root"]}`}>
        <Typography variant="h4">Add skill</Typography>
        <form onSubmit={onSubmit}>
          <div className={`${styles["input"]}`}>
            <TextField fullWidth required variant="outlined" value={name} onChange={(ev) => setName(ev.target.value)} label="Skill name" />
            <TextField
              fullWidth
              required
              multiline
              rows={10}
              variant="outlined"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              label="Skill description"
            />
            <div>
              <Typography variant="h6">Upload skill icon</Typography>
              <Input type="file" onChange={onIconFileChanged} />
            </div>
          </div>
          <Button loading={loading} fullWidth type="submit">
            Save
          </Button>
        </form>
        <Snackbar open={snackbarOpen} onClose={closeSnackbar} message={message} autoHideDuration={3000} />
      </Container>
    </>
  );
};

export default AddSkillPage;

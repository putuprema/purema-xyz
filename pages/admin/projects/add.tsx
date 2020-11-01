import Container from "components/container/Container";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Input, SnackbarCloseReason, TextField, Typography } from "@material-ui/core";
import { Button } from "components/Button";
import styles from "components/admin/AdminPage.module.scss";
import Snackbar from "components/Snackbar";
import Head from "next/head";
import { ServiceContext } from "services/frontend";
import adminPageStyles from "components/admin/AdminPage.module.scss";
import { useRouter } from "next/router";
import { getServerSidePropsWithAuth } from "helpers/getServerSidePropsWithAuth";

const AddProjectPage: NextPage = () => {
  const { projectService } = useContext(ServiceContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();

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

  const onThumbnailFileChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      if (!file.name.match(/\.(svg|png|jpg)$/)) {
        openSnackbar("Only SVG, PNG, and JPG files are supported");
        setThumbnailFile(undefined);
      } else {
        setThumbnailFile(file);
      }
    }
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!loading) {
      setLoading(true);

      try {
        if (!thumbnailFile) {
          throw new Error("Project thumbnail file is required");
        }

        await projectService.add({ name, category, description, youtubeEmbedUrl, demoUrl, githubUrl, thumbnailFile });
        openSnackbar("Project successfully added");
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
        <title>Add new project</title>
      </Head>
      <Container compact className={`${adminPageStyles["root"]}`}>
        <Typography variant="h4">Add project</Typography>
        <form onSubmit={onSubmit}>
          <div className={`${styles["input"]}`}>
            <TextField fullWidth required variant="outlined" value={name} onChange={(ev) => setName(ev.target.value)} label="Project name" />
            <TextField
              fullWidth
              required
              variant="outlined"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              label="Project category"
            />
            <TextField
              fullWidth
              required
              multiline
              rows={10}
              variant="outlined"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              label="Project description"
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              value={demoUrl}
              onChange={(ev) => setDemoUrl(ev.target.value)}
              label="Project demo URL"
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              value={githubUrl}
              onChange={(ev) => setGithubUrl(ev.target.value)}
              label="Project Github URL"
            />
            <TextField
              fullWidth
              variant="outlined"
              value={youtubeEmbedUrl}
              onChange={(ev) => setYoutubeEmbedUrl(ev.target.value)}
              label="Project Youtube embed URL"
            />
            <div>
              <Typography variant="h6">Upload project thumbnail</Typography>
              <Input type="file" onChange={onThumbnailFileChanged} />
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

export const getServerSideProps = getServerSidePropsWithAuth();

export default AddProjectPage;

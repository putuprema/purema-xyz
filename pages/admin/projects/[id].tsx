import { GetServerSideProps, NextPage } from "next";
import { bootstrapServices, Services } from "services";
import styles from "components/admin/AdminPage.module.scss";
import Head from "next/head";
import Container from "components/container/Container";
import { Input, SnackbarCloseReason, TextField, Typography } from "@material-ui/core";
import { Button } from "components/Button";
import Snackbar from "components/Snackbar";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Project } from "models/Project";

interface PageProps {
  project: Project;
}

const EditProjectPage: NextPage<PageProps> = ({ project }) => {
  const { projectService } = useContext(Services);
  const router = useRouter();

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(project.name);
  const [category, setCategory] = useState(project.category);
  const [description, setDescription] = useState(project.description);
  const [demoUrl, setDemoUrl] = useState(project.demoUrl);
  const [githubUrl, setGithubUrl] = useState(project.githubUrl);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(project.youtubeEmbedUrl);
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

    if (!editLoading) {
      setEditLoading(true);

      try {
        await projectService.update(project.id, { name, category, description, youtubeEmbedUrl, demoUrl, githubUrl, thumbnailFile });
        openSnackbar("Project successfully edited");
        router.back();
      } catch (err) {
        openSnackbar(err.message);
      } finally {
        setEditLoading(false);
      }
    }
  };

  const onDeleteBtnClicked = async () => {
    if (!deleteLoading) {
      if (confirm("Are you sure want to delete ?")) {
        setDeleteLoading(true);
        try {
          await projectService.delete(project.id);
          openSnackbar("Project successfully deleted");
          router.back();
        } catch (err) {
          openSnackbar(err.message);
        } finally {
          setDeleteLoading(false);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Edit project</title>
      </Head>
      <Container compact className={`${styles["root"]}`}>
        <Typography variant="h4">Edit project</Typography>
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
          <div className={styles["two-btn-container"]}>
            <Button loading={editLoading} type="submit">
              Save
            </Button>
            <Button loading={deleteLoading} color="secondary" onClick={onDeleteBtnClicked}>
              Delete
            </Button>
          </div>
        </form>
        <Snackbar open={snackbarOpen} onClose={closeSnackbar} message={message} autoHideDuration={3000} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const { projectService } = bootstrapServices();
  const { id } = ctx.params!;

  return {
    props: {
      project: await projectService.get(id as string),
    },
  };
};

export default EditProjectPage;

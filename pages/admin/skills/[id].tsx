import { Skill } from "models/Skill";
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

interface PageProps {
  skill: Skill;
}

const EditSkillPage: NextPage<PageProps> = ({ skill }) => {
  const { skillService } = useContext(Services);
  const router = useRouter();

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(skill.name);
  const [description, setDescription] = useState(skill.description);
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

    if (!editLoading) {
      setEditLoading(true);

      try {
        await skillService.update(skill.id, { name, description, iconFile });
        openSnackbar("Skill successfully edited");
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
          await skillService.delete(skill.id);
          openSnackbar("Skill successfully deleted");
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
        <title>Edit skill</title>
      </Head>
      <Container compact className={`${styles["root"]}`}>
        <Typography variant="h4">Edit skill</Typography>
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
  const { skillService } = bootstrapServices();
  const { id } = ctx.params!;

  return {
    props: {
      skill: await skillService.get(id as string),
    },
  };
};

export default EditSkillPage;

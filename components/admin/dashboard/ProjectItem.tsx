import { Typography } from "@material-ui/core";
import { Button } from "components/Button";
import { Project } from "models/Project";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProjectItem.module.scss";

const ProjectItem: React.FC<Project> = ({ id, thumbnail, name, category, description, demoUrl, githubUrl }) => {
  const router = useRouter();

  const onDemoBtnClicked = () => {
    window.open(demoUrl, "_blank");
  };

  const onGithubBtnClicked = () => {
    window.open(githubUrl, "_blank");
  };

  const onEditBtnClicked = () => {
    router.push("/admin/projects/[id]", `/admin/projects/${id}`);
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["thumbnail-container"]}>
        <Image src={thumbnail} width={1280} height={720} />
      </div>
      <div className={styles["details"]}>
        <Typography variant="h6" className={styles["name"]}>
          {name}
        </Typography>
        <Typography variant="body1" className={styles["category"]}>
          {category}
        </Typography>
        <Typography variant="body2" className={styles["description"]}>
          {description}
        </Typography>
        <div className={styles["btn-container"]}>
          <Button disabled={!demoUrl} onClick={onDemoBtnClicked}>
            Demo
          </Button>
          <Button disabled={!githubUrl} onClick={onGithubBtnClicked}>
            Github
          </Button>
          <Button variant="outlined" onClick={onEditBtnClicked}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

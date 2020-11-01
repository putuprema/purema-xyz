import { Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Button } from "components/Button";
import { Project } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import ProjectItem from "./ProjectItem";
import styles from "./SkillList.module.scss";

interface Props {
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  const router = useRouter();

  const onAddBtnClicked = () => {
    router.push("/admin/projects/add");
  };

  return (
    <div className={`${styles["root"]}`}>
      <div className={styles["header"]}>
        <Typography variant="h4">My Projects</Typography>
        <Button variant="text" onClick={onAddBtnClicked}>
          <Add fontSize="large" />
        </Button>
      </div>
      <div>
        {projects.map((p) => (
          <ProjectItem key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

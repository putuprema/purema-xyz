import { Typography } from "@material-ui/core";
import { Button } from "components/Button";
import { Project as ProjectModel } from "models/Project";
import Image from "next/image";
import styles from "./Project.module.scss";

interface Props {
  p: ProjectModel;
}

const Project: React.FC<Props> = ({ p }) => {
  const onDemoBtnClicked = () => {
    window.open(p.demoUrl, "_blank");
  };

  const onGithubBtnClicked = () => {
    window.open(p.githubUrl, "_blank");
  };

  return (
    <div className={`${styles["item"]}`}>
      <div className={`${styles["thumb"]}`}>
        <Image src={p.thumbnail} width={1280} height={720} alt={p.name} />
      </div>
      <div className={`${styles["details"]}`}>
        <Typography variant="h4" className={`${styles["name"]}`}>
          {p.name}
        </Typography>
        <Typography variant="h6" className={`${styles["category"]}`}>
          {p.category}
        </Typography>
        <Typography variant="body1">{p.description}</Typography>
        <div className={`${styles["cta-container"]}`}>
          <Button onClick={onDemoBtnClicked} disabled={!p.demoUrl} fullWidth>
            Demo
          </Button>
          <Button onClick={onGithubBtnClicked} disabled={!p.githubUrl} fullWidth variant="outlined">
            Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Project;

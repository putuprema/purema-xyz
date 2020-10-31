import { Typography } from "@material-ui/core";
import { ArrowDropDownCircleOutlined } from "@material-ui/icons";
import { Button } from "components/Button";
import Container from "components/container/Container";
import SectionHeading from "components/section-heading/SectionHeading";
import { useState } from "react";
import styles from "./index.module.scss";
import ProjectThumbnail from "components/page-sections/projects/desktop-layout/ProjectThumbnail";
import ProjectThumbsContainer from "components/page-sections/projects/desktop-layout/ProjectThumbsContainer";
import { ProjectLayoutProps } from "components/page-sections/projects/ProjectLayoutProps";

const ProjectsDesktopLayout: React.FC<ProjectLayoutProps> = ({ projects }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const onDemoBtnClicked = (idx: number) => {
    window.open(projects[idx].demoUrl, "_blank");
  };

  const onGithubBtnClicked = (idx: number) => {
    window.open(projects[idx].githubUrl, "_blank");
  };

  return (
    <Container className={`${styles["main-container"]}`}>
      <ProjectThumbsContainer activeProjectIdx={activeProjectIdx}>
        {projects.map((p, idx) => (
          <ProjectThumbnail key={idx} name={p.name} thumbnail={p.thumbnail} />
        ))}
      </ProjectThumbsContainer>
      <div>
        <div className={`${styles["project-details"]}`}>
          <Button
            variant="text"
            className={`${styles["project-nav-btn__prev"]}`}
            disabled={activeProjectIdx === 0}
            onClick={() => setActiveProjectIdx(activeProjectIdx - 1)}
            title={projects[activeProjectIdx - 1]?.name}
          >
            <ArrowDropDownCircleOutlined fontSize="inherit" />
          </Button>
          <div>
            <SectionHeading>Projects</SectionHeading>
            <div className={`${styles["project-heading"]}`}>
              <div className={`${styles["project-number"]}`}>
                <Typography variant="h3">{activeProjectIdx + 1}</Typography>
              </div>
              <div>
                <Typography variant="h4" className={`${styles["project-title"]}`}>
                  {projects[activeProjectIdx].name}
                </Typography>
                <Typography variant="h6" className={`${styles["project-category"]}`}>
                  {projects[activeProjectIdx].category}
                </Typography>
              </div>
            </div>
            <Typography variant="body1">{projects[activeProjectIdx].description}</Typography>
            <div className={`${styles["cta-container"]}`}>
              <Button onClick={() => onDemoBtnClicked(activeProjectIdx)} disabled={!projects[activeProjectIdx].demoUrl} fullWidth>
                Demo
              </Button>
              <Button
                onClick={() => onGithubBtnClicked(activeProjectIdx)}
                disabled={!projects[activeProjectIdx].githubUrl}
                fullWidth
                variant="outlined"
              >
                Github
              </Button>
            </div>
          </div>
          <Button
            variant="text"
            className={`${styles["project-nav-btn__next"]}`}
            disabled={activeProjectIdx === projects.length - 1}
            onClick={() => setActiveProjectIdx(activeProjectIdx + 1)}
            title={projects[activeProjectIdx + 1]?.name}
          >
            <ArrowDropDownCircleOutlined fontSize="inherit" />
          </Button>
        </div>
        <div className={`${styles["item-selector"]}`}>
          <div className={`${styles["item-selector-inner"]}`}>
            {projects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProjectIdx(idx)}
                aria-label={`${idx}`}
                className={activeProjectIdx === idx ? styles["active"] : undefined}
                title={p.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProjectsDesktopLayout;

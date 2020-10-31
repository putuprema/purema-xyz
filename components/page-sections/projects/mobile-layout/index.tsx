import React from "react";
import { ProjectLayoutProps } from "../ProjectLayoutProps";
import Container from "components/container/Container";
import styles from "./index.module.scss";
import Project from "./Project";
import SectionHeading from "components/section-heading/SectionHeading";

const ProjectsMobileLayout: React.FC<ProjectLayoutProps> = ({ projects }) => {
  return (
    <Container>
      <SectionHeading>Projects</SectionHeading>
      <div className={`${styles["projects-container"]}`}>
        {projects.map((p, idx) => (
          <Project key={idx} p={p} />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsMobileLayout;

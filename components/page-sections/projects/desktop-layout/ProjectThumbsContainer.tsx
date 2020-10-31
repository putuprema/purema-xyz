import React from "react";
import styles from "./ProjectThumbsContainer.module.scss";

interface Props {
  activeProjectIdx: number;
}

const ProjectThumbsContainer: React.FC<Props> = ({ children, activeProjectIdx }) => (
  <div className={`${styles["project-thumbs-container"]}`}>
    <div className={`${styles["project-thumbs-container-inner"]}`} style={{ transform: `translateY(calc((-280px - 3rem) * ${activeProjectIdx}))` }}>
      {children}
    </div>
  </div>
);

export default ProjectThumbsContainer;

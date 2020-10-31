import Image from "next/image";
import React from "react";
import styles from "./ProjectThumbnail.module.scss";

interface Props {
  name: string;
  thumbnail: string;
}

const ProjectThumbnail: React.FC<Props> = ({ name, thumbnail }) => (
  <div title={name} className={`${styles["project-thumb"]}`}>
    <Image src={thumbnail} width={1280} height={720} alt={name} />
  </div>
);

export default ProjectThumbnail;

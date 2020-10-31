import React from "react";
import styles from "./SkillSet.module.scss";
import Image from "next/image";

interface Props {
  name: string;
  icon: string;
  selected: boolean;
  onClick: () => any;
}

const SkillSet: React.FC<Props> = ({ name, icon, selected, onClick }) => {
  return (
    <div title={name} className={`${styles[selected ? "skill-set__selected" : "skill-set"]}`} onClick={onClick}>
      <Image src={icon} alt={name} width={100} height={100} />
    </div>
  );
};

export default SkillSet;

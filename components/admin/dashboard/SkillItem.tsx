import { Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Skill } from "models/Skill";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./SkillItem.module.scss";

const SkillItem: React.FC<Skill> = ({ id, name, icon }) => {
  const router = useRouter();

  const onEditBtnClicked = () => {
    router.push("/admin/skills/[id]", `/admin/skills/${id}`);
  };

  return (
    <div className={`${styles["root"]}`}>
      <Image src={icon} width={60} height={60} />
      <div className={styles["details"]}>
        <Typography variant="h6" className={styles["name"]}>
          {name}
        </Typography>
      </div>
      <button className={styles["btn-edit"]} onClick={onEditBtnClicked}>
        <Edit fontSize="large" />
        <Typography variant="h5">Edit</Typography>
      </button>
    </div>
  );
};

export default SkillItem;

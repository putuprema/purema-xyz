import { Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Button } from "components/Button";
import { Skill } from "models/Skill";
import { useRouter } from "next/router";
import React from "react";
import SkillItem from "./SkillItem";
import styles from "./SkillList.module.scss";

interface Props {
  skills: Skill[];
}

const SkillList: React.FC<Props> = ({ skills }) => {
  const router = useRouter();

  const onAddBtnClicked = () => {
    router.push("/admin/skills/add");
  };

  return (
    <div className={`${styles["root"]}`}>
      <div className={styles["header"]}>
        <Typography variant="h4">My Skills</Typography>
        <Button variant="text" onClick={onAddBtnClicked}>
          <Add fontSize="large" />
        </Button>
      </div>
      <div className={`${styles["list-container"]}`}>
        {skills.map((s) => (
          <SkillItem key={s.id} {...s} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;

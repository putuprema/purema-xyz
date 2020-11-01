import { Typography } from "@material-ui/core";
import Container from "components/container/Container";
import SectionHeading from "components/section-heading/SectionHeading";
import Section from "components/section/Section";
import { Skill } from "models/Skill";
import { useState } from "react";
import styles from "./Skills.module.scss";
import SkillSet from "./SkillSet";

interface Props {
  skills: Skill[];
}

const Skills: React.FC<Props> = ({ skills }) => {
  const [selectedSkill, selectSkill] = useState<Skill>(skills[0]);

  return (
    <Section id="skills" fullScreen centered backgroundColor="white">
      <Container>
        <SectionHeading>Skills</SectionHeading>
        <div className={`${styles["main-content"]}`}>
          <div className={`${styles["skill-set-container"]}`}>
            {skills.map((s) => (
              <SkillSet key={s.name} name={s.name} icon={s.icon} selected={selectedSkill === s} onClick={() => selectSkill(s)} />
            ))}
          </div>
          <div>
            <Typography variant="h4">{selectedSkill?.name}</Typography>
            <Typography variant="body1">{selectedSkill?.description}</Typography>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Skills;

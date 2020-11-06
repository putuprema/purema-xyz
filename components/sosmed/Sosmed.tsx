import { Email, GitHub, LinkedIn } from "@material-ui/icons";
import React from "react";
import styles from "./Sosmed.module.scss";

interface Props {
  color?: "primary" | "secondary" | "black";
  size?: "large" | "small";
}

const Sosmed: React.FC<Props> = ({ color, size }) => (
  <div className={`${styles["root"]} ${styles[`color-${color}`]} ${styles[`font-${size}`]}`}>
    <a title="Follow me on Github" href="https://github.com/putuprema" target="_blank">
      <GitHub color="inherit" fontSize="inherit" />
    </a>
    <a title="Let's connect on LinkedIn" href="https://linkedin.com/in/putuprema" target="_blank">
      <LinkedIn color="inherit" fontSize="inherit" />
    </a>
    <a title="Send me an email" href="mailto:iputupremaananda@gmail.com">
      <Email color="inherit" fontSize="inherit" />
    </a>
  </div>
);

Sosmed.defaultProps = {
  color: "primary",
  size: "large",
};

export default Sosmed;

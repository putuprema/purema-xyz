import { Typography } from "@material-ui/core";
import styles from "./SectionHeading.module.scss";

const SectionHeading: React.FC = ({ children }) => (
  <div className={`${styles["page-header"]}`}>
    <Typography variant="h1">{children}</Typography>
  </div>
);

export default SectionHeading;

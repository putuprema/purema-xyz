import { Typography } from "@material-ui/core";
import styles from "./NavItem.module.scss";

const NavItem: React.FC = ({ children }) => {
  return (
    <li className={`${styles["nav-item"]}`}>
      <Typography variant="body2">{children}</Typography>
    </li>
  );
};

export default NavItem;

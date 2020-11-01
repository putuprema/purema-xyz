import { Typography } from "@material-ui/core";
import styles from "./NavItem.module.scss";
import { Link as ReactScrollLink } from "react-scroll";

interface Props {
  href?: string;
  scrollOffset?: number;
}

const NavItem: React.FC<Props> = ({ children, href, scrollOffset }) => {
  return (
    <li className={`${styles["nav-item"]}`}>
      <ReactScrollLink to={href || ""} smooth offset={scrollOffset}>
        <Typography variant="body2">{children}</Typography>
      </ReactScrollLink>
    </li>
  );
};

export default NavItem;

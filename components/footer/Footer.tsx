import { Typography } from "@material-ui/core";
import Container from "components/container/Container";
import Sosmed from "components/sosmed/Sosmed";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={`${styles["root"]}`}>
      <Container className={`${styles["inner"]}`}>
        <Typography variant="body2">
          <strong>© I Putu Prema Ananda D.N</strong>
        </Typography>
        <Sosmed color="black" size="small" />
      </Container>
    </footer>
  );
};

export default Footer;

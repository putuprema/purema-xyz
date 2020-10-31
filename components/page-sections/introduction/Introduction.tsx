import { Typography } from "@material-ui/core";
import Container from "components/container/Container";
import Section from "components/section/Section";
import Sosmed from "components/sosmed/Sosmed";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Introduction.module.scss";

const Introduction = () => {
  const [myBigPhotoShown, setMyBigPhotoShown] = useState(true);
  const myBigPhotoRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight) {
      setMyBigPhotoShown(false);
    } else {
      setMyBigPhotoShown(true);

      if (myBigPhotoRef.current) {
        myBigPhotoRef.current.style.transform = `translateY(-${window.scrollY * 0.5}px)`;
      }
    }
  };

  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Section fullScreen centered>
      <Container className={`${styles["main-container"]}`}>
        <div className={`${styles["me-in-a-circle"]}`}>
          <Image src="/img/me-with-bg.jpg" width={500} height={500} alt="Putu Prema" />
        </div>
        <div className={`${styles["main-content"]}`}>
          <div className={`${styles["paragraph-content"]}`}>
            <Typography variant="body1">Hello World, I'm</Typography>
            <Typography variant="h1">Putu Prema</Typography>
            <Typography variant="body1">I build full-stack applications to make lives of millions of people easier</Typography>
          </div>
          <Sosmed />
        </div>
      </Container>
      <Container ref={myBigPhotoRef} className={`${styles["self-photo-container"]}`} style={{ display: !myBigPhotoShown ? "none" : undefined }}>
        <Image src="/img/me.png" unsized alt="Putu Prema" />
      </Container>
    </Section>
  );
};

export default Introduction;

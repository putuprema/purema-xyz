import { Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import containerStyles from "components/container/Container.module.scss";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = ({ children }) => {
  const navRef = useRef<HTMLElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const [opaque, setOpaque] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);
  const [navMenuShown, setNavMenuShown] = useState(false);

  const handleScroll = () => {
    if (!navMenuShown) {
      if (window.scrollY >= 80) {
        setOpaque(true);
      } else {
        setOpaque(false);
      }
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");

    if (menuOpen) {
      body?.classList.add("navbar-expanded");

      if (navRef.current && navLogoRef.current) {
        navRef.current.style.height = `${navRef.current.scrollHeight}px`;
      }

      setOpaque(true);
      setOverlayShown(true);
      setNavMenuShown(true);
    } else {
      body?.classList.remove("navbar-expanded");

      if (navRef.current && navLogoRef.current) {
        navRef.current.style.height = `calc(24px + 2rem + 2rem)`;
      }

      setTimeout(() => {
        setOpaque(false);
        setOverlayShown(false);
        setNavMenuShown(false);
      }, 400);
    }
  }, [menuOpen]);

  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles["nav-overlay"]} ${overlayShown ? styles["shown"] : ""} ${menuOpen ? styles["expanded"] : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></div>
      <nav className={`${styles["navbar"]} ${opaque ? styles["opaque"] : ""}`} ref={navRef}>
        <div className={`${styles["nav-content"]} ${containerStyles["container"]} `}>
          <div className={`${styles["nav-logo-container"]}`} ref={navLogoRef}>
            <div>
              <Typography variant="h4" style={{ lineHeight: 0 }}>
                P
                <span className="font-weight-light" style={{ fontSize: "1.25rem" }}>
                  p
                </span>
              </Typography>
            </div>
            <button aria-label="tombol perluas menu navigasi" className={`${styles["nav-expand-btn"]}`} onClick={() => setMenuOpen(!menuOpen)}>
              <Typography variant="h4" style={{ lineHeight: 0 }}>
                <Menu fontSize="inherit" style={{ padding: 0, margin: 0 }} />
              </Typography>
            </button>
          </div>
          <ul className={`${styles["nav-menu"]} ${navMenuShown ? styles["shown"] : ""} ${menuOpen ? styles["open"] : ""}`}>{children}</ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

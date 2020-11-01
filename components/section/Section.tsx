import React from "react";
import styles from "./Section.module.scss";
import { Element } from "react-scroll";

export interface SectionProps {
  /**
   * Whether section takes minimum
   * full height of the viewport
   */
  fullScreen?: boolean;

  /**
   * Whether the contents are centered
   * horizontally and vertically
   */
  centered?: boolean;
  backgroundColor?: string;
}

type Props = SectionProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Section: React.FC<Props> = ({ children, fullScreen, centered, backgroundColor, ...props }) => {
  return (
    <Element name={props.id || ""}>
      <section
        {...props}
        style={{ ...props.style, backgroundColor }}
        className={`${styles[fullScreen ? "section__fullscreen" : "section"]} ${centered ? styles["content-centered"] : ""}`}
      >
        {children}
      </section>
    </Element>
  );
};

Section.defaultProps = {
  fullScreen: false,
  centered: false,
};

export default Section;

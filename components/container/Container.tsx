import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  compact?: boolean;
}

type Props = ContainerProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div ref={ref} {...props} className={`${styles[props.compact ? "root__compact" : "root"]} ${props.className}`}>
    {props.children}
  </div>
));

Container.defaultProps = {
  compact: false,
  className: "",
};

export default Container;

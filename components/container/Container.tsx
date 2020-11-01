import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  compact?: boolean;
}

type Props = ContainerProps & React.HTMLProps<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, Props>(({ compact, className, children, ...props }, ref) => (
  <div ref={ref} {...props} className={`${styles[compact ? "root__compact" : "root"]} ${className}`}>
    {children}
  </div>
));

Container.defaultProps = {
  compact: false,
  className: "",
};

Container.displayName = "Container";

export default Container;

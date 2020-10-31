import React from "react";
import styles from "./Container.module.scss";

// const Container: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ children, ...props }) => {
//   return (
//     <div {...props} className={`${styles["container"]} ${props.className}`}>
//       {children}
//     </div>
//   );
// };

const Container = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} className={`${styles["container"]} ${props.className}`}>
    {props.children}
  </div>
));

export default Container;

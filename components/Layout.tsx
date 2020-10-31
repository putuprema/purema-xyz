import * as React from "react";
import Head from "next/head";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import NavItem from "./navbar/NavItem";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Navbar>
      <NavItem>Home</NavItem>
      <NavItem>Skill</NavItem>
      <NavItem>Projects</NavItem>
      <NavItem>Reach Out!</NavItem>
    </Navbar>
    {children}
    <Footer />
  </>
);

Layout.defaultProps = {
  title: "Putu Prema",
};

export default Layout;

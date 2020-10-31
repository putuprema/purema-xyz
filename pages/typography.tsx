import { Typography } from "@material-ui/core";
import { Button } from "components/Button";
import Container from "components/container/Container";
import Layout from "components/Layout";
import Navbar from "components/navbar/Navbar";
import NavItem from "components/navbar/NavItem";
import Section from "components/section/Section";
import React from "react";

const TypographyPage: React.FC = () => (
  <Layout>
    <Navbar>
      <NavItem>Menu 1</NavItem>
      <NavItem>Menu 2</NavItem>
      <NavItem>Menu 3</NavItem>
    </Navbar>
    <Container>
      <Section fullScreen>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h1">Test</Typography>
        <Typography variant="h2">Test</Typography>
        <Typography variant="h3">Test</Typography>
        <Typography variant="h4">Test</Typography>
        <Typography variant="h5">Test</Typography>
        <Typography variant="h6">Test</Typography>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <Typography variant="subtitle2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
        <Button size="large">Test</Button>
        <Button size="small">Test</Button>
        <Button variant="outlined" size="large">
          Test
        </Button>
      </Section>
    </Container>
  </Layout>
);

export default TypographyPage;

import Container from "components/container/Container";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "components/admin/AdminPage.module.scss";
import { Skill } from "models/Skill";
import { Project } from "models/Project";
import { bootstrapServices } from "services";
import SkillList from "components/admin/dashboard/SkillList";
import ProjectList from "components/admin/dashboard/ProjectList";

interface PageProps {
  skills: Skill[];
  projects: Project[];
}

const AdminIndexPage: NextPage<PageProps> = ({ skills, projects }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container compact className={`${styles["root"]}`}>
        <SkillList skills={skills} />
        <ProjectList projects={projects} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const { skillService, projectService } = bootstrapServices();

  const skills = await skillService.getAll();
  const projects = await projectService.getAll();

  return {
    props: {
      skills,
      projects,
    },
  };
};

export default AdminIndexPage;

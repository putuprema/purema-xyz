import Container from "components/container/Container";
import { GetServerSidePropsResult, NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "components/admin/AdminPage.module.scss";
import { Skill } from "models/Skill";
import { Project } from "models/Project";
import { bootstrapBackendServices } from "services/backend";
import SkillList from "components/admin/dashboard/SkillList";
import ProjectList from "components/admin/dashboard/ProjectList";
import { getServerSidePropsWithAuth } from "helpers/getServerSidePropsWithAuth";

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

export const getServerSideProps = getServerSidePropsWithAuth(
  async (ctx): Promise<GetServerSidePropsResult<PageProps>> => {
    const { skillService, projectService } = bootstrapBackendServices();

    const skills = await skillService.getAll();
    const projects = await projectService.getAll();

    return {
      props: {
        skills,
        projects,
      },
    };
  }
);

export default AdminIndexPage;

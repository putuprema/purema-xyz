import Introduction from "components/page-sections/introduction/Introduction";
import Layout from "components/Layout";
import Skills from "components/page-sections/skills/Skills";
import Projects from "components/page-sections/projects/Projects";
import ContactMe from "components/page-sections/contact-me/ContactMe";
import { GetStaticProps, NextPage } from "next";
import { Skill } from "models/Skill";
import { Project } from "models/Project";
import { bootstrapBackendServices } from "services/backend";

interface PageProps {
  skills: Skill[];
  projects: Project[];
}

const MainPage: NextPage<PageProps> = ({ skills, projects }) => (
  <Layout>
    <Introduction />
    <Skills skills={skills} />
    <Projects projects={projects} />
    {/* <ContactMe /> */}
  </Layout>
);

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { skillService, projectService } = bootstrapBackendServices();

  const skills = await skillService.getAll();
  const projects = await projectService.getAll();

  return {
    props: {
      skills,
      projects,
    },
    revalidate: 1,
  };
};

export default MainPage;

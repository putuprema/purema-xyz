import Section from "components/section/Section";
import { Project } from "models/Project";
import { useContext } from "react";
import { ViewportContext } from "misc/viewport";
import ProjectsDesktopLayout from "components/page-sections/projects/desktop-layout";
import ProjectsMobileLayout from "./mobile-layout";

interface Props {
  projects: Project[];
}

const Projects: React.FC<Props> = ({ projects }) => {
  const viewport = useContext(ViewportContext);

  return (
    <Section fullScreen centered backgroundColor="white">
      {viewport.isDesktop ? <ProjectsDesktopLayout projects={projects} /> : <ProjectsMobileLayout projects={projects} />}
    </Section>
  );
};

export default Projects;

import Section from "components/section/Section";
import { Project } from "models/Project";
import { useContext } from "react";
import { ViewportContext } from "misc/viewport";
import ProjectsDesktopLayout from "components/page-sections/projects/desktop-layout";
import ProjectsMobileLayout from "./mobile-layout";

const myProjects: Project[] = [
  {
    id: "",
    name: "Flappy Bird",
    category: "Artificial Intelligence",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: "/img/sample-illustration.jpg",
    githubUrl: "https://www.google.com",
    demoUrl: "https://www.google.com",
  },
  {
    id: "",
    name: "Flick Landing Page",
    category: "Website",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: "/img/sample-illustration.jpg",
    githubUrl: "https://www.detik.com",
    demoUrl: "https://www.detik.com",
  },
  {
    id: "",
    name: "Pong",
    category: "Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: "/img/sample-illustration.jpg",
    githubUrl: "https://www.instagram.com",
    demoUrl: "https://www.instagram.com",
  },
  {
    id: "",
    name: "Tic Tac Toe",
    category: "Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: "/img/sample-illustration.jpg",
    githubUrl: "https://www.instagram.com",
    demoUrl: "https://www.instagram.com",
  },
  {
    id: "",
    name: "Binary Search Tree Simulator",
    category: "Game",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: "/img/sample-illustration.jpg",
    githubUrl: "https://www.instagram.com",
    demoUrl: "https://www.instagram.com",
  },
];

const Projects: React.FC = () => {
  const viewport = useContext(ViewportContext);

  return (
    <Section fullScreen centered backgroundColor="white">
      {viewport.isDesktop ? <ProjectsDesktopLayout projects={myProjects} /> : <ProjectsMobileLayout projects={myProjects} />}
    </Section>
  );
};

export default Projects;

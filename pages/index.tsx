import Introduction from "components/page-sections/introduction/Introduction";
import Layout from "components/Layout";
import Skill from "components/page-sections/skill/Skill";
import Projects from "components/page-sections/projects/Projects";
import ContactMe from "components/page-sections/contact-me/ContactMe";

const MainPage = () => (
  <Layout>
    <Introduction />
    <Skill />
    <Projects />
    <ContactMe />
  </Layout>
);

export default MainPage;

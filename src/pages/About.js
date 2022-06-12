import { Link as RouterLink } from "react-router-dom"

const About = () => {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </>
  );
}


export default About
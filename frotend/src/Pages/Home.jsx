import Front from "../components/Home/Front";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import About from "../components/Home/About";
import Continents from "./Continents";

export default function Home() {
  return (
    <main>
      <Front />
      <About />
      <UpcomingEvents />
      <Continents/>
    </main>
  );
}

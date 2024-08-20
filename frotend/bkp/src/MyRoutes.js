import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import EventDetails from "./Pages/EventDetail";
import EventForm from "./components/Event/AddEvent";
import SubscribeForm from "./components/Subscribe/SubscibeForm";
import Login from "./Pages/Login";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import ResultsScreen from "./Pages/ResultsScreen";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/create-event" element={<EventForm />} />
      <Route path="/subscribe" element={<SubscribeForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route path="/search-results" element={<ResultsScreen />} />

    </Routes>
  );
}

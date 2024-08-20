import MyRoutes from "./MyRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import OrganizerDashboard from "./Pages/OrganizerDashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Conference Alerts";
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

  }, []);
  return (
    <div className="App">
      {
        !isAuthenticated ? (<>
          <Navbar />
          <MyRoutes />
          <Footer />
        </>) : (
          <OrganizerDashboard />
        )
      }

    </div>
  );
}

export default App;


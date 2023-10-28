import { Navbar, UserNavbar, HostNavbar } from "./Navbars";
import Home from "./Home";
import Upload from "./Upload";
import Host from "./host/Host";
import Summary from "./host/Summary";
import NewNetwork from "./host/NewNetwork";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/upload" element={<UserNavbar />} />
          <Route path="/host/*" element={<HostNavbar />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/host" element={<Host />} />
            <Route path="/host/summary" element={<Summary />} />
            <Route path="/host/newnetwork" element={<NewNetwork />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

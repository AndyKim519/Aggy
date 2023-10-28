const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Aggy</h1>
      <div className="links">
        <a className="button" href="/upload">
          User
        </a>
        <a className="button" href="/host">
          Host
        </a>
      </div>
    </nav>
  );
};

const UserNavbar = () => {
  return (
    <nav className="navbar">
      <h1>Aggy</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
      </div>
    </nav>
  );
};

const HostNavbar = () => {
  return (
    <nav className="navbar">
      <h1>Aggy</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/host">Host</a>
        <a href="/host/summary">Summary</a>
        <a href="/host/newnetwork">New Networks</a>
      </div>
    </nav>
  );
};

export { Navbar, UserNavbar, HostNavbar };

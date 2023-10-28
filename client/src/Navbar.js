const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Aggy</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/create">Summary</a>
        <a href="/summary">Upload</a>
        <a href="/network">Network</a>
        <a className="login" href="/login">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

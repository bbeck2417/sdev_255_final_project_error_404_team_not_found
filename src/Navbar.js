import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navBrand">Xavier Institute</div>

      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
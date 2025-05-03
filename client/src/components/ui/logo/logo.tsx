import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <h3 className="text-2xl md:text-3xl font-semibold">
        Influencr<span className="text-primary">In</span>
      </h3>
    </Link>
  );
}

export default Logo;

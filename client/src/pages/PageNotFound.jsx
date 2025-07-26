import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div>Page Not Found</div>
      <div>
        <Link to="/"> Go to Home page</Link>
      </div>
    </div>
  );
};

export default PageNotFound;

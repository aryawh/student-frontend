import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigator = useNavigate();
  function addNewStudent() {
    navigator("/add-student");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Full Stack Application
          </Link>

          <button
            className="btn btn-outline-light mb-2"
            onClick={addNewStudent}
          >
            Add student
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;

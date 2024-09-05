import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStudent,
  getStudent,
  updateStudent,
} from "../service/StudentService";

const StudentComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [major, setMajor] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    major: "",
  });

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getStudent(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setMajor(response.data.major);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function cancelUpdate() {
    navigator("/students");
  }

  function saveOrUpdateStudent(e) {
    e.preventDefault();

    if (validateForm()) {
      const student = { firstName, lastName, major };
      console.log(student);

      if (id) {
        updateStudent(id, student)
          .then((response) => {
            console.log(response.data);
            navigator("/students");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createStudent(student)
          .then((response) => {
            console.log(response.data);
            navigator("/students");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (major.trim()) {
      errorsCopy.major = "";
    } else {
      errorsCopy.major = "Major is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update student</h2>;
    } else {
      return <h2 className="text-center">Add student</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 border rounded offset-md-3 shadow">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name : </label>
                <input
                  type="text"
                  placeholder="Enter student First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name : </label>
                <input
                  type="text"
                  placeholder="Enter student Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Major : </label>
                <input
                  type="text"
                  placeholder="Enter student major"
                  name="major"
                  value={major}
                  className={`form-control ${errors.major ? "is-invalid" : ""}`}
                  onChange={(e) => setMajor(e.target.value)}
                ></input>
                {errors.major && (
                  <div className="invalid-feedback">{errors.major}</div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateStudent}>
                Submit
              </button>
              <button className="btn btn-danger mx-3" onClick={cancelUpdate}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;

import React, { useEffect, useState } from "react";
import { deleteStudent, listStudents } from "../service/StudentService";
import { useNavigate } from "react-router-dom";

const ListStudentComponent = () => {
  const [student, setStudent] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    listStudents()
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => console.log(error));
  }

  function updateStudent(id) {
    navigator(`/add-student/${id}`);
  }

  function removeStudent(id) {
    console.log(id);
    deleteStudent(id)
      .then((response) => {
        getAllStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <br />
      <h2 className="text-center">List Of Students</h2>
      <table className="table border shadow">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student FirstName</th>
            <th>Student LastName</th>
            <th>Student Major</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((students) => (
            <tr key={students.id}>
              <td>{students.id}</td>
              <td>{students.firstName}</td>
              <td>{students.lastName}</td>
              <td>{students.major}</td>
              <td>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => updateStudent(students.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => removeStudent(students.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentComponent;

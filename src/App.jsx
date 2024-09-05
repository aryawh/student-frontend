import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/HeaderComponent";
import Footer from "./component/FooterComponent";
import ListStudentComponent from "./component/ListStudentComponent";
import StudentComponent from "./component/StudentComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListStudentComponent />}></Route>
          {/* http://locahost:3000/students */}
          <Route path="/students" element={<ListStudentComponent />}></Route>
          {/* http://locahost:3000/add-student */}
          <Route path="/add-student" element={<StudentComponent />}></Route>
          {/* http://locahost:3000/add-student/1 */}
          <Route path="/add-student/:id" element={<StudentComponent />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

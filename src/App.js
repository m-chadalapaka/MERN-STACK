import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component"  
import Courses from "./components/courses-list.component";
import EditCourse from "./components/edit-course.component";
import CreateCourse from "./components/create-course.component";
import CreateStudent from "./components/create-student.component";
import Students from "./components/student-list.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
          <br/>
        <Route path="/i" exact component={Courses}/>
        <Route path="/edit/:id" component={EditCourse} />
          <Route path="/create" component={CreateCourse} />
          <Route path="/student" component={CreateStudent} />
          <Route path="/students" component={Students}/>
      </Router>
   </div>
  );
}

export default App;

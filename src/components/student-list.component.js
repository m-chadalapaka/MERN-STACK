/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.studentId}</td>    
  </tr>
)

export default class StudentsList extends Component {
  constructor(props) {
    super(props);

    // this.deleteCourse = this.deleteCourse.bind(this)

    this.state = {students: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/students/')
      .then(response => {
        this.setState({ students: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

//   deleteCourse(id) {
//     axios.delete('http://localhost:5000/courses/'+id)
//       .then(response => { console.log(response.data)});

//     this.setState({
//         courses: this.state.courses.filter(el => el._id !== id)
//     })
//   }

  studentsList() {
    return this.state.students.map(currentstudent => {
      return <Student student={currentstudent} key={currentstudent._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Available Students</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Student Name</th>
              <th>Student Id</th>
            </tr>
          </thead>
          <tbody>
            { this.studentsList() }
          </tbody>
        </table>
      </div>
    )
  }
}
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Course = props => (
  <tr>
    <td>{props.course.coursename}</td>
    <td>{props.course.description}</td>
    <td>{props.course.duration}</td>
    <td>{props.course.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.course._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCourse(props.course._id) }}>delete</a>
    </td>
  </tr>
)

export default class CourseList extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this)

    this.state = {courses: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/courses/')
      .then(response => {
        this.setState({ courses: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCourse(id) {
    axios.delete('http://localhost:5000/courses/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        courses: this.state.courses.filter(el => el._id !== id)
    })
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      return <Course course={currentcourse} deleteCourse={this.deleteCourse} key={currentcourse._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Available Courses</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Coursename</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.courseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCoursename = this.onChangeCoursename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      coursename: '',
      studentId: 0,
      description: '',
      duration: 0,
      date: new Date(),
      students: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/courses/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            students: response.data.map(student => student.name),
            coursename: response.data[0].coursename
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeCoursename(e) {
    this.setState({
      coursename: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const course = {
      coursename: this.state.coursename,
      studentId: this.state.studentId,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(course);

    axios.post('http://localhost:5000/courses/add', course)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Course</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Coursename: </label>

          <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeCoursename}
                />
 
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Course" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
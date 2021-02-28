import React, { Component } from 'react';
import axios from 'axios';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentname = this.onChangeStudentname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeStudentname(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const student = {
      name: this.state.name,
      studentId: Math.floor(Math.random() * 1000)
    }

    console.log(student);

    axios.post('http://localhost:5000/students/add', student)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
      studentId: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Student</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Student Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeStudentname}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Student" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
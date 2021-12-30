import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      task:'',
      day:'',
      reminder:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      id: this.state.id,
      task: this.state.task,
      day: this.state.day,
      reminder: this.state.reminder
    };

    axios
      .post('/api/addTask', data)
      .then(res => {
        this.setState({
          id: '',
          task:'',
          day:'',
          reminder:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in added Task!");
      })
  };

  render() {
    return (
      <div className="Register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Task
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Task</h1>
              <p className="lead text-center">
                  
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='ID'
                    name='id'
                    className='form-control'
                    value={this.state.id}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Task'
                    name='task'
                    className='form-control'
                    value={this.state.task}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Day'
                    name='day'
                    className='form-control'
                    value={this.state.day}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='checkbox'
                    placeholder='Reminder'
                    name='reminder'
                    className='form-control'
                    value={this.state.reminder}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
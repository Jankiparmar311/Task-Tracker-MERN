import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      task: '',
      day: '',
      reminder: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/list/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.data.id,
          task: res.data.task,
          day: res.data.day,
          reminder: res.data.reminder
        })
      })
      .catch(err => {
        console.log("Error from UpdateTask");
      })
  };

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
      .put('/api/list'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in Update Task!");
      })
  };


  render() {
    return (
      <div className="UpdateUserInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Task List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Task</h1>
              <p className="lead text-center">
                  Update Task's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="id">ID</label>
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
            <label htmlFor="task">Task</label>
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
            <label htmlFor="day">Day</label>
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
            <label htmlFor="reminder">Reminder</label>
              <input
                type='checkbox'
                placeholder='Reminder'
                name='reminder'
                className='form-control'
                value={this.state.reminder}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Task</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateTask;
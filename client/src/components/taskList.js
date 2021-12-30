import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    };
  }

  componentDidMount() {
    
    axios
      .get('/api/list'+this.props.match.params.id)
      .then(res => {
        this.setState({
          task: res.data
        })
      })
      .catch(err => {
        console.log("Error from TaskList");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('/api/deletetask/:id'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error in delete");
      })
  };

  render() {

    const task = this.state.task;
    let Tasklst = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ID</td>
            <td>{ task.id }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Task</td>
            <td>{ task.task }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Day</td>
            <td>{ task.day }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Reminder</td>
            <td>{ task.reminder }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowUserDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Task List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Task's Record</h1>
              <p className="lead text-center">
                  View Task's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { Tasklst }
          </div>
          <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,task.id)}>Delete Task</button><br />
            </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
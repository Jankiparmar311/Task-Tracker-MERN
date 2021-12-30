
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Register from './components/Register';
import login from './components/login';
import TaskList from './components/taskList';
import AddTask from './components/AddTask';

class App extends Component {
  const [user, setLoginUser] = useState({});
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={TaskList} />
          <Route path='/login' element={<login setLoginUser={setLoginUser} />} />
          <Route path='/addTask' component={AddTask} />
          <Route path='/Register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
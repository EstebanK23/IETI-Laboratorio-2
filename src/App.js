import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from "./components/TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import {Login} from './components/Login';
import {TodoApp} from './components/TodoApp';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class App extends Component {

    constructor(props) {
        super(props);
        localStorage.setItem('username',"esteban@gmail.com");
        localStorage.setItem('password',"2302");
    }


    render() {
        const LoginView = () => (
            <Login/>
        );

        const TodoAppView = () => (
            <TodoApp/>
        );
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <br/>
                    <br/>

                    <ul>
                        {localStorage.getItem('IsLoggedIn') === "true"?
                        <li><Link to="/todo">Todo</Link></li> : <li><Link to="/">Login</Link></li>}
                    </ul>

                    <div>
                        {localStorage.getItem('IsLoggedIn') === "true"?
                            <Route path="/todo" component={TodoAppView}/> : <Route exact path="/" component={LoginView}/>}
                    </div>
                </div>
            </Router>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }

}

export default App;

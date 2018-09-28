import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Container } from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Container>
                <AppNavbar />
                <ShoppingList />
            </Container>
        </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

const welcome = {
  greeting: "Hey",
  title: "React"
}

function App() {
  const title = 'React'
  return (
    <div>
      <h1>
        {welcome["greeting"]} {welcome["title"]}
      </h1>

      <label htmlFor="search">search: </label>
      <input id="search" type="text"/>
    </div>
  );
}

export default App;

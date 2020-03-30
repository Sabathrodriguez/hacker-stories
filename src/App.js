import React from 'react';
import logo from './logo.svg';
import './App.css';

const welcome = {
  greeting: "Hey",
  title: "React"
}

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0
    }, 
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ]

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <h1>
        My hacker stories
      </h1>

      <label htmlFor="search">search: </label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>Searching for <strong>{searchTerm}</strong>.</p>

      <hr/>
      <List list={stories}/>
    </div>
  ); 
};

const List = props => (
   props.list.map(item => (
      <div key={item.objectID}>
        <span><a href={item.url}>{item.title}</a></span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
  ))
);

export default App;

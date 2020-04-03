import React from 'react';
import './App.css';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  //A
  const handleSearch = event => {
    //C
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story => {
    return (
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>My hacker stories</h1>

      <Search onSearch={handleSearch} search={searchTerm}/>

      <hr/>
      <List list={searchedStories}/>
    </div>
  ); 
};

const Search = ({search, onSearch}) => {

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch}/>
    </div>
  );
}

const List = ({ list }) => (
    list.map(item => (
      <Item key={item.objectID} item={item} />
  ))
);

const Item = ({ item }) => {
  return (
    <div>
      <span><a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  )
}

export default App;

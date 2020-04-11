import React from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './SearchForm/index';
import List from './List/index';



const storiesReducer = (state, action) => {
  if (action.type === "SET_STORIES") {
    return action.payload;
  } else if (action.type === "REMOVE_STORY") {
    return {
      ...state, data: state.data.filter(story => action.payload.objectID !== story.objectID),
    };
  } else if (action.type === "STORIES_FETCH_INIT") {
    return {
      ...state, isLoading: true, isError: false,
    }
  } else if (action.type === "STORIES_FETCH_SUCCESS") {
    return {
      ...state, isLoading: false, isError: false, data: action.payload,
    };
  } else if (action.type === "STORIES_FETCH_FAILURE") {
    return {
      ...state, isLoading: false, isError: true,
    };
  } else {
    throw new Error();
  }
}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

//A
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);
  

  const [stories, dispatchStories] = React.useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false }
    );

  //A
  const handleFetchStories = React.useCallback(async () => {

    dispatchStories({type: 'STORIES_FETCH_INIT'});

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
  } catch {
    dispatchStories({
      type: 'STORIES_FETCH_FAILURE'
    });
  }
 }, [url]); //E

  React.useEffect(() => {
    handleFetchStories(); //C
  }, [handleFetchStories]); //D

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY', payload: item,
    });
  };

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  //A
  const handleSearchInput = event => {
    //C
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="headline">My hacker stories</h1>

      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} OnSearchSubmit={handleSearchSubmit}/>

      <hr/>
      {stories.isError && <p>Something went wrong...</p>}
      { stories.isLoading ? (<p>Loading...</p>) :<List list={stories.data} onRemoveItem={handleRemoveStory}/> }
    </div>
  ); 
};

export default App;

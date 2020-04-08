import React from 'react';
import './App.css';

//REMOVE
const initialStories = [
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

//REMOVE
const getAsyncStories = () => 
    new Promise(resolve => 
      setTimeout( () => resolve({data: {stories: initialStories}}), 2000));

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');
  

  const [stories, dispatchStories] = React.useReducer(storiesReducer,
    { data: [], isLoading: false, isError: false }
    );

  React.useEffect(() => {
    if (!searchTerm) return;

    dispatchStories({type: 'STORIES_FETCH_INIT'});

    fetch(`${API_ENDPOINT}${searchTerm}`)//B
    .then(response => response.json())//C
    .then(result => {
      dispatchStories({type: 'STORIES_FETCH_SUCCESS', 
      payload: result.hits, //D
    });
    }).catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'}));
  }, [searchTerm]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY', payload: item,
    });
  };

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  //A
  const handleSearch = event => {
    //C
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>My hacker stories</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}>
        <strong><SimpleTextComponent yourText="Search:"/></strong>
      </InputWithLabel>

      <hr/>
      {stories.isError && <p>Something went wrong...</p>}
      { stories.isLoading ? (<p>Loading...</p>) :<List list={stories.data} onRemoveItem={handleRemoveStory}/> }
    </div>
  ); 
};

const InputWithLabel = ({id, value, type="text", onInputChange, isFocused, children}) => {

  //A
  const inputRef = React.useRef();

  //C 
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      //D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label> &nbsp;
      {/* B */}
      <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange}/>
    </>
  );
}

const List = ({ list, onRemoveItem }) => (
    list.map(item => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
  ))
);

const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  }
  return (
    <div>
      <span><a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span><button type="button" onClick={() => handleRemoveItem(item)}>Dismiss</button></span>
    </div>
  )
}

const SimpleTextComponent = ({yourText}) => {
  return (
    <>
      {yourText}
    </>
  )
}

export default App;

import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer'
import App, {Item, List, SearchForm, InputWithLabel} from './App'

describe('Item', () => {
  const item = {
    title: 'React',
    url: 'https//:www.reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  };
  it('renders all properties', () => {
    const component = renderer.create(<Item item={item}/>)
    expect(component.root.findByType('a').props.href).toEqual(
      'https//:www.reactjs.org'
    );
    expect(component.root.findAllByProps({children: 'Jordan Walke'}).length).toEqual(1);
  });
  it('calls onRemoveItem on button click', () =>{
    const handleRemoveItem = jest.fn();

    const component = renderer.create(<Item item={item} onRemoveItem={handleRemoveItem}/>);
    component.root.findByType('button').props.onClick();
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    expect(component.root.findAllByType(Item).length).toEqual(1);
  });
});

// describe('something truthy', () => {
//   it('true to be true', () => {
//     expect(true).toBe(true);
//   });
// });

// //test suite
// describe('truthy and falsy', () => {
//   //test case
//   test('true to be true', () => {
//     //test assertion
//     expect(true).toBe(true);
//   });
  
//   //test case
//   test('false to be false', () => {
//     //test assertion
//     expect(false).toBe(false);
//   });
// });

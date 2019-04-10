import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from '../CustomButton';

test('renders correctly', () => {
  const tree = renderer.create(<CustomButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

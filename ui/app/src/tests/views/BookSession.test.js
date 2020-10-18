
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import BookSession from '../../views/student/BookSession'

afterEach(cleanup);

it('Renders Book Session View', () => {
  const {queryAllByText} = render(
    <BookSession/>
  );
  expect(queryAllByText(/Book a Session/i)).toBeTruthy();
});

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import TutorHeader from '../../components/layout/TutorHeader'

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


afterEach(cleanup);

it('Renders Tutor Header', () => {
  const {queryByText} = render(
    <Router history={history}>
      <TutorHeader/>
    </Router>,
  );

  expect(queryByText(/dashboard/i)).toBeTruthy();
  expect(queryByText(/preferences/i)).toBeTruthy();
  expect(queryByText(/log out/i)).toBeTruthy();
});
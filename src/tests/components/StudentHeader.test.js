import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import StudentHeader from '../../components/layout/StudentHeader'

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


afterEach(cleanup);

it('Renders Student Header', () => {
  const {queryByText} = render(
    <Router history={history}>
      <StudentHeader/>
    </Router>,
  );

  expect(queryByText(/dashboard/i)).toBeTruthy();
  expect(queryByText(/book a session/i)).toBeTruthy();
  expect(queryByText(/log out/i)).toBeTruthy();
});
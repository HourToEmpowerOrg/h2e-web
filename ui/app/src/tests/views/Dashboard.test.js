
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Dashboard from '../../views/Dashboard'

import StudentDashboard from '../../views/StudentDashboard'

afterEach(cleanup);

it('Renders Tutor Dashboard', () => {
  const {queryAllByText} = render(
    <Dashboard/>
  );
  expect(queryAllByText(/upcoming sessions/i)).toBeTruthy();
});


it('Renders Student Dashboard', () => {
    const {queryAllByText} = render(
      <StudentDashboard/>
    );
    expect(queryAllByText(/upcoming sessions/i)).toBeTruthy();
});
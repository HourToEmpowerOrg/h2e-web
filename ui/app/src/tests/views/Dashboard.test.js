import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import StudentDashboard from '../../views/StudentDashboard'



const Container = StudentDashboard;

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Container />);
});

describe('StudentDashboard', () => {
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render both page headers <h4>', () => {
    const wrapper = mount(
      <MemoryRouter>
        <StudentDashboard/>
      </MemoryRouter>
    );
    expect(wrapper.find('h4').length).toBe(2);
  });
});
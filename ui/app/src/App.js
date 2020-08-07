import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutAlternative from './layouts/LayoutAlternative';
import LayoutSignin from './layouts/LayoutSignin';

// Views 
import Home from './views/Home';
import Secondary from './views/Secondary';
import Login from './views/Login';
import AboutUs from './views/AboutUs'
import Parents from './views/Parents'

//Sign up pages
import Signup from './views/Signup';
import SignupTutor from './views/SignupTutor';
import SignupStudent from './views/SignupStudent';
import SignupSchools from './views/SignupSchools';

import NotFound from './views/NotFound'

class App extends React.Component {

  componentDidMount() {
    document.body.classList.add('is-loaded')
    this.refs.scrollReveal.init();
  }

  // Route change
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.refs.scrollReveal.init();
    }
  }

  render() {
    return (
      <ScrollReveal
        ref="scrollReveal"
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute exact path="/login" component={Login} layout={LayoutSignin} />
            <AppRoute exact path="/signup" component={Signup} layout={LayoutSignin} />
            <AppRoute exact path="/parents" component={Parents} layout={LayoutDefault} />
            <AppRoute exact path="/about" component={AboutUs} layout={LayoutDefault} />
            <AppRoute exact path="/signup/student" component={SignupStudent} layout={LayoutSignin} />
            <AppRoute exact path="/signup/tutor" component={SignupTutor} layout={LayoutSignin} />
            <AppRoute exact path="/signup/schools" component={SignupSchools} layout={LayoutSignin} />
            <AppRoute path="*" component={NotFound} layout={LayoutDefault}></AppRoute>
          </Switch>
        )} />
    );
  }
}

export default withRouter(props => <App {...props} />);
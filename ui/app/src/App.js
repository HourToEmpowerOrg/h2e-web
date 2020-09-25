import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutAlternative from './layouts/LayoutAlternative';
import LayoutSignin from './layouts/LayoutSignin';
import LayoutTutor from './layouts/LayoutTutor';
import LayoutStudent from './layouts/LayoutStudent';

// Views 
import Home from './views/Home';
import Secondary from './views/Secondary';
import Login from './views/Login';
import AboutUs from './views/AboutUs'
import Parents from './views/Parents'
import TermsOfUse from './views/TermsOfUse'

//Sign up pages
import Signup from './views/Signup';
import SignupTutor from './views/SignupTutor';
import SignupStudent from './views/SignupStudent';
import SignupSchools from './views/SignupSchools';

// Tutor Views
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound'
import ProtectedRoute from './utils/ProtectedRoute';
import Preferences from './views/Preferences';
import SessionDetailsPage from './views/SessionDetails';

// Student Views
import StudentDashboard from './views/StudentDashboard';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-178422805-1');

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
            <AppRoute path="/static/index.html" component={Home} layout={LayoutDefault} />

            <AppRoute exact path="/termsofuse" component={TermsOfUse} layout={LayoutDefault} />

            {/* TODO NEED TO HAVE THESE PROTECTED!!! */}
            <ProtectedRoute exact path="/dashboard" component={Dashboard} layout={LayoutTutor} />
            <ProtectedRoute exact path="/preferences" component={Preferences} layout={LayoutTutor} />
            {/* TODO: How to change layout based on useer type? */}
            <ProtectedRoute exact path="/session/:id" component={SessionDetailsPage} layout={LayoutTutor} />

            {/*  STUDENT ROUTES TODO: acces to These should be handled based on user type */}
            <ProtectedRoute exact path="/student/dashboard" component={StudentDashboard} layout={LayoutStudent} />
            {/* <ProtectedRoute exact path="/student/preferences" component={StudentPreferences} layout={LayoutStudent} /> */}
            {/* TODO: How to change layout based on useer type? */}
            {/* <ProtectedRoute exact path="/student/session/:id" component={StudentSessionDetailsPage} layout={LayoutStudent} /> */}


            <AppRoute path="*" component={NotFound} layout={LayoutDefault}></AppRoute>
          </Switch>
        )} />
    );
  }
}

export default withRouter(props => <App {...props} />);
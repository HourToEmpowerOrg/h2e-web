import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'


const getUserFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      // ignore
    }
  }
  return null;
};

const getSession = () => {
  const jwt = Cookies.get('hourtoempower')
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      // what is window.atob ?
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
      session = JSON.parse(window.atob(base64))
    }
  } catch (error) {
    console.log(error)
  }
  return session
}


const logOut = () => {
  Cookies.remove('hourtoempower')
}


const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {

  Layout = (Layout === undefined) ? props => (<React.Fragment>{props.children}</React.Fragment>) : Layout;

  return (
    <Route
      {...rest}
      render={props => !!getSession() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
        />
      )} />
  );
}

export default ProtectedRoute;
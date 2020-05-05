import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...rest} {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/dang-nhap',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default PrivateRoute
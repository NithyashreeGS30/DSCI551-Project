// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInPage from './signin/SignInPage';
import BodyPage from './bodyuser';
import BodyPage1 from './bodyadmin';
import CheckoutPage from './checkoutpage/checkoutpage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignInPage} />
        <Route path="/body" component={BodyPage} />
        <Route path="/body1" component={BodyPage1} />
        <Route path="/checkout" component={CheckoutPage}/>
      </Switch>
    </Router>
  );
};

export default App;

import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} algoliaIndex={firebase.algoliaIndex} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;

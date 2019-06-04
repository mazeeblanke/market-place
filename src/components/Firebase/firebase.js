import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import algoliasearch from 'algoliasearch';

const config = {
  apiKey: "AIzaSyANCj3-I3mPr6uzLBBhN-1_zH732aGTTQM",
  authDomain: "market-place-c1f5f.firebaseapp.com",
  databaseURL: "https://market-place-c1f5f.firebaseio.com",
  projectId: "market-place-c1f5f",
  storageBucket: "market-place-c1f5f.appspot.com",
  messagingSenderId: "52924525812",
  appId: "1:52924525812:web:2b3932e118c59b7b"
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

     // configure algolia
     const algolia = algoliasearch(
      '19UDD2JBAF',
      '121979503d131533d943cd3ea8cb0e52'
    );
    this.algoliaIndex = algolia.initIndex('marketplace');


    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // console.log(authUser)
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // console.log(dbUser)
            // // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = {};
            // }

            // // merge auth and db user
            // authUser = {
            //   uid: authUser.uid,
            //   email: authUser.email,
            //   emailVerified: authUser.emailVerified,
            //   providerData: authUser.providerData,
            //   ...dbUser,
            // };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  // message = uid => this.db.ref(`messages/${uid}`);

  // messages = () => this.db.ref('messages');

  // document = (refId) => this.db.ref(`/documents/${refId}`);

  products = () => this.db.ref(`/`);

  // annotation = (annotationId) => this.db.ref(`/annotations/${annotationId}`);

  // annotations = () => this.db.ref(`annotations`);

}

export default Firebase;

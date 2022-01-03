import { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, fullName) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user = auth.currentUser;
        return user.sendEmailVerification();
      })
      .then(() => {
        const user = auth.currentUser;
        return firestore().collection('users').doc(user.uid).set({
          userId: user.uid,
          avatarUrl: '',
          fullName: fullName,
          emailAddress: email.toLowerCase(),
          events: [],
          attendingEvents: [],
          dateCreated: Date.now(),
        });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function sendVerificationEmail() {
    return currentUser.sendEmailVerification();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
      // if(user?.emailVerified === false) {
      // console.log('should send email');
      // return currentUser?.sendEmailVerification().then(()=>{
      //   console.log('email should be sent');
      //logout();
      // });
      //}
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    sendVerificationEmail,
    //setUsername
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

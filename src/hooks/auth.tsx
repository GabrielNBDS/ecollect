import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import firebase from '../lib/firebase';

interface AuthContextData {
  user: firebase.default.User;
  signInWithGoogle: () => Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.default.User | null>(null);

  const signInWithGoogle = useCallback(async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    setUser(response.user);
  }, []);

  const signOut = useCallback(async () => {
    await firebase.auth().signOut();
    setUser(null);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async changedUser => {
        if (changedUser) {
          setUser(changedUser);
        } else {
          await firebase.auth().signOut();
          setUser(null);
        }
      });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };

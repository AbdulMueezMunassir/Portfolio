import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { scheduleWhenIdle } from '../lib/scheduleWhenIdle';

const OWNER_EMAIL = 'abmueez593@gmail.com';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isOwner: boolean;
  ownerEmail: string;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const cancelScheduledLoad = scheduleWhenIdle(() => {
      void Promise.all([import('firebase/auth'), import('../lib/firebase')])
        .then(([firebaseAuth, firebaseClient]) => {
          if (!active) return;
          unsubscribe = firebaseAuth.onAuthStateChanged(firebaseClient.auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
          });
        })
        .catch((error: unknown) => {
          console.warn('Firebase authentication is unavailable:', error);
          setLoading(false);
        });
    });

    return () => {
      active = false;
      cancelScheduledLoad();
      unsubscribe?.();
    };
  }, []);

  const isOwner = Boolean(user && user.email && user.email.toLowerCase() === OWNER_EMAIL.toLowerCase());

  const loginWithGoogle = async () => {
    const [firebaseAuth, firebaseClient] = await Promise.all([
      import('firebase/auth'),
      import('../lib/firebase'),
    ]);
    await firebaseAuth.signInWithPopup(firebaseClient.auth, firebaseClient.googleProvider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const [firebaseAuth, firebaseClient] = await Promise.all([
      import('firebase/auth'),
      import('../lib/firebase'),
    ]);
    await firebaseAuth.signInWithEmailAndPassword(firebaseClient.auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    const [firebaseAuth, firebaseClient] = await Promise.all([
      import('firebase/auth'),
      import('../lib/firebase'),
    ]);
    await firebaseAuth.createUserWithEmailAndPassword(firebaseClient.auth, email, pass);
  };

  const logout = async () => {
    const [firebaseAuth, firebaseClient] = await Promise.all([
      import('firebase/auth'),
      import('../lib/firebase'),
    ]);
    await firebaseAuth.signOut(firebaseClient.auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isOwner,
        ownerEmail: OWNER_EMAIL,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

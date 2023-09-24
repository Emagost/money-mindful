import { createContext, memo, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app, auth, getDBInstance } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const authContext = createContext<{
  user: User | null;
  logout: () => void;
  loading: boolean;
  loginWithGoogle: () => any;
}>({
  user: null,
  logout: () => {},
  loading: true,
  loginWithGoogle: () => {},
});

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const db = getDBInstance();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    const userResult = await setPersistence(auth, browserLocalPersistence).then(
      () => signInWithPopup(auth, googleProvider)
    );

    try {
      setUser(userResult.user);

      const { displayName, email, uid, photoURL, metadata } = userResult.user;
      const { lastSignInTime, creationTime } = metadata;

      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            metadata: {
              lastSignInTime,
            },
          },
          { merge: true }
        );
      } else {
        await setDoc(userRef, {
          uid,
          name: displayName,
          email,
          photoURL,
          metadata: {
            lastSignInTime,
            creationTime,
          },
          roles: ["user"],
        });
      }

      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        logout,
        loading,
        loginWithGoogle,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

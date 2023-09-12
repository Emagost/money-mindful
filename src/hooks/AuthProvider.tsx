import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

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

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
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
}

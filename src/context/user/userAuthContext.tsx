// import { auth, db } from "../../firebase/firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   type User,
// } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";

// type AuthContextData = {
//   user: User | null;
//   role: "user" | "admin" | null;
//   logIn: typeof logIn;
//   signUp: typeof signUp;
//   logOut: typeof logOut;
//     loading: boolean;
// };

// interface IUserAuthProviderProps {
//   children: React.ReactNode;
// }

// const logIn = (eamil: string, password: string) => {
//   return signInWithEmailAndPassword(auth, eamil, password);
// };

// const signUp = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };
// const logOut = () => {
//   signOut(auth);
// };

// export const userAuthContext = createContext<AuthContextData>({
//   user: null,
//   role: null,
// loading: true,
//   logIn,
//   signUp,
//   logOut,
// });

// export const UserAuthProvider: React.FC<IUserAuthProviderProps> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<"user" | "admin" | null>(null);
//     const [loading, setLoading] = useState(true); // 👈 loading state
//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUser(firebaseUser);
//         try {
//           const docRef = doc(db, "users", firebaseUser.uid);
//           const snap = await getDoc(docRef);
//           if (snap.exists()) {
//             const data = snap.data();
//             console.log(data);
            
//             if (data.role === "admin") setRole("admin");
//             else setRole("user");
//           } else {
//             setRole("user");
//           }
//         } catch (err) {
//           console.error("Failed to fetch user role:", err);
//           setRole(null);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//       }
//       setLoading(false);
//     });
//     return () => unSubscribe();
//   }, []);

//   const value: AuthContextData = {
//     user,
//     role,
//     loading,
//     logIn,
//     signUp,
//     logOut,

//   };
//   return (
//     <userAuthContext.Provider value={value}>
//       {children}
//     </userAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => {
//   return useContext(userAuthContext);
// };


// src/context/userAuthContext.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth, firestore } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: FirebaseUser | null;
  role: "admin" | "family" | null;
  familyId: string | null;
  loading: boolean;
  loginWithHouseNumber: (houseNumber: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useUserAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<"admin" | "family" | null>(null);
  const [familyId, setFamilyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch role from Firestore
        try {
          const userDocRef = doc(firestore, "users", firebaseUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.role === "admin") {
              setRole("admin");
              setFamilyId(null);
            } else if (data.role === "family" && typeof data.familyId === "string") {
              setRole("family");
              setFamilyId(data.familyId);
            } else {
              // unknown role
              setRole(null);
              setFamilyId(null);
            }
          } else {
            // no user doc: treat as no role
            setRole(null);
            setFamilyId(null);
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole(null);
          setFamilyId(null);
        }
      } else {
        setUser(null);
        setRole(null);
        setFamilyId(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Convert houseNumber to email: e.g. `${houseNumber}@your-domain.com`
  const EMAIL_DOMAIN = "mahallu-app.local"; // for production, use a real domain you control

  const loginWithHouseNumber = async (houseNumber: string, password: string) => {
    setLoading(true);
    try {
      const email = `${houseNumber}@${EMAIL_DOMAIN}`;
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle role fetching & navigation
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged will clear state
    navigate("/login");
  };

  const value: AuthContextType = {
    user,
    role,
    familyId,
    loading,
    loginWithHouseNumber,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

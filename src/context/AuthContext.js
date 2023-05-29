// Import delle funzioni e degli oggetti necessari per l'autenticazione con Firebase
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Modulo firebase.js nella cartella superiore
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; //documenti firebase

// Creazione del contesto per l'autenticazione
const AuthContext = createContext();

// Componente provider del contesto, gestisce lo stato dell'utente e le funzioni di autenticazione
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // Stato dell'utente, inizialmente vuoto
  

  // Funzione per registrare un nuovo utente, crea l'account in Firebase e salva un documento nel database
  function createDoc(email) {
    setDoc(doc(db, "user", email), {
      savedShows: [],
    });
  }



  // Funzione per effettuare il login dell'utente, restituisce una promise con le informazioni dell'utente
  function logIn(email, password) {
    const persistence = browserSessionPersistence; //Quando si chiude la sessione, ci si slogga

    return setPersistence(auth, persistence).then(() =>
      signInWithEmailAndPassword(auth, email, password)
    );
  }

  // Funzione per effettuare il logout dell'utente, restituisce una promise
  function logOut() {
    return signOut(auth);
  }

  // Hook useEffect per gestire le informazioni sull'autenticazione dell'utente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Callback che riceve le informazioni sull'utente autenticato
      setUser(currentUser); // Aggiorna lo stato dell'utente
    });
    return () => {
      unsubscribe(); // Cleanup della sottoscrizione all'evento di autenticazione
    };
  });

  // Fornisce lo stato dell'utente e le funzioni di autenticazione attraverso il contesto
  return (
    <AuthContext.Provider value={{ createDoc, logIn, logOut, user}}>
      {children} {/*Rende disponibili le informazioni ai componenti figli*/}
    </AuthContext.Provider>
  );
}

// Hook useContext per accedere al contesto dell'autenticazione da qualsiasi componente figlio
export function UserAuth() {
  return useContext(AuthContext);
}

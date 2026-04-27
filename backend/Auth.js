import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

export async function signup(email, password, setUser) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;
  setUser(user);
  console.log("User signed up:", user);
  return user;
}


export async function login(email, password, setUser) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const user = userCred.user;
  setUser(user);
  console.log("User logged in:", user);
  return user;
}


export async function isEmailInUse(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0;
}


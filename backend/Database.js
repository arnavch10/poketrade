import { doc, setDoc, getDoc, getDocs, collection, query, where, addDoc, orderBy, limit } from "firebase/firestore"
import { database } from "./Firebase"


export async function createSearch(userId, queryText, results) {
  const docRef = await addDoc(collection(database, "searches"), {
    userId,
    query: queryText,
    results,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function getSearchHistory(userId) {
  const q = query(collection(database, "searches"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}
import { db } from "../firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export async function addGoal(userId, title, dueDate = "") {
  await addDoc(collection(db, "users", userId, "goals"), {
    title,
    progress: 0,
    status: "Not Started",
    dueDate,
    createdAt: serverTimestamp(),
  });
}

export async function deleteGoal(userId, goalId) {
  await deleteDoc(
    doc(db, "users", userId, "goals", goalId)
  );
}

export function subscribeToGoals(userId, callback) {
  const q = query(
    collection(db, "users", userId, "goals"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
}
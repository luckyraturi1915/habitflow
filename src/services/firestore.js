import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function addHabit(userId, habitName) {
  await addDoc(collection(db, "users", userId, "habits"), {
    name: habitName,
    completedDays: {},
    color: "#22c55e",
    createdAt: serverTimestamp(),
  });
}

export async function getHabits(userId) {
  const snapshot = await getDocs(
    collection(db, "users", userId, "habits")
  );

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function deleteHabit(userId, habitId) {
  await deleteDoc(
    doc(db, "users", userId, "habits", habitId)
  );
}
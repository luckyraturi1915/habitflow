import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function addHabit(userId, habitName) {
  await addDoc(collection(db, "users", userId, "habits"), {
    name: habitName,
    days: {},
  });
}

export async function getHabits(userId) {
  const snapshot = await getDocs(
    collection(db, "users", userId, "habits")
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function updateHabit(userId, habitId, days) {
  await updateDoc(
    doc(db, "users", userId, "habits", habitId),
    {
      days,
    }
  );
}
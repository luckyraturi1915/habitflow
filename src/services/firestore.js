import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// Add a new habit
export async function addHabit(userId, habitName) {
  await addDoc(collection(db, "users", userId, "habits"), {
    name: habitName,
    completedDays: {},
    color: "#22c55e",
    createdAt: serverTimestamp(),
  });
}

// Get all habits
export async function getHabits(userId) {
  const snapshot = await getDocs(
    collection(db, "users", userId, "habits")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Delete a habit
export async function deleteHabit(userId, habitId) {
  await deleteDoc(
    doc(db, "users", userId, "habits", habitId)
  );
}

// Update a habit
export async function updateHabit(userId, habitId, data) {
  await updateDoc(
    doc(db, "users", userId, "habits", habitId),
    data
  );
}
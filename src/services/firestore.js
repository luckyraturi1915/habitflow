import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
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

// Get all habits (one-time fetch)
export async function getHabits(userId) {
  const snapshot = await getDocs(
    collection(db, "users", userId, "habits")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Listen for habits in real time
export function subscribeToHabits(userId, callback) {
  return onSnapshot(
    collection(db, "users", userId, "habits"),
    (snapshot) => {
      const habits = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(habits);
    }
  );
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
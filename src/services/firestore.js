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
export async function addHabit(
  userId,
  habitName,
  category = "Personal",
  color = "#22c55e"
) {
  await addDoc(collection(db, "users", userId, "habits"), {
    name: habitName,
    category,
    color,
    completedDays: {},
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

// Real-time listener
export function subscribeToHabits(userId, callback) {
  return onSnapshot(
    collection(db, "users", userId, "habits"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  );
}

// Delete
export async function deleteHabit(userId, habitId) {
  await deleteDoc(
    doc(db, "users", userId, "habits", habitId)
  );
}

// Update
export async function updateHabit(
  userId,
  habitId,
  data
) {
  await updateDoc(
    doc(db, "users", userId, "habits", habitId),
    data
  );
}
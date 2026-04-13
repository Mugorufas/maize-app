/**
 * chatHistoryService.js
 * Firestore service for AIChatbot per-user conversation history.
 *
 * Collection path: ai_chats/{userId}/chats/{chatId}
 */
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';

const chatsRef = (userId) =>
  collection(db, 'ai_chats', userId, 'chats');

/**
 * Load all chats for a user, ordered newest first.
 * @returns {Array} list of chat objects
 */
export const loadChats = async (userId) => {
  if (!db || !userId) return null;
  try {
    const q = query(chatsRef(userId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('[chatHistoryService] loadChats error:', err);
    return null;
  }
};

/**
 * Save (create or overwrite) a single chat document.
 * @param {string} userId
 * @param {object} chat  — full chat object including id, title, messages, createdAt
 */
export const saveChat = async (userId, chat) => {
  if (!db || !userId || !chat?.id) return;
  try {
    await setDoc(doc(chatsRef(userId), chat.id), chat, { merge: true });
  } catch (err) {
    console.error('[chatHistoryService] saveChat error:', err);
  }
};

/**
 * Delete a single chat document.
 */
export const deleteChat = async (userId, chatId) => {
  if (!db || !userId || !chatId) return;
  try {
    await deleteDoc(doc(chatsRef(userId), chatId));
  } catch (err) {
    console.error('[chatHistoryService] deleteChat error:', err);
  }
};

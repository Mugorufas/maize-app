/**
 * scanHistoryService.js
 * Firestore + Storage service for AIPestScanner per-user scan history.
 *
 * Firestore path : ai_scans/{userId}/scans/{scanId}
 * Storage path   : scan_images/{userId}/{scanId}
 *
 * Images are stored in Firebase Storage (not Firestore) to stay within
 * the 1 MB per-document limit. The Firestore document stores the download URL.
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
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../firebase';

const scansRef = (userId) =>
  collection(db, 'ai_scans', userId, 'scans');

/**
 * Load all scans for a user, ordered newest first.
 * @returns {Array|null}
 */
export const loadScans = async (userId) => {
  if (!db || !userId) return null;
  try {
    const q = query(scansRef(userId), orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('[scanHistoryService] loadScans error:', err);
    return null;
  }
};

/**
 * Upload the base64 image to Firebase Storage and return the public download URL.
 * Returns null if storage is unavailable.
 */
export const uploadScanImage = async (userId, scanId, base64DataUrl) => {
  if (!storage || !userId || !scanId || !base64DataUrl) return null;
  try {
    const imageRef = ref(storage, `scan_images/${userId}/${scanId}`);
    await uploadString(imageRef, base64DataUrl, 'data_url');
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (err) {
    console.error('[scanHistoryService] uploadScanImage error:', err);
    return null;
  }
};

/**
 * Save (create or overwrite) a scan document in Firestore.
 * The `image` field (base64) is replaced by `imageUrl` (Storage URL).
 *
 * @param {string} userId
 * @param {object} scan — full scan object; `image` (base64) will be stripped, `imageUrl` must be provided
 */
export const saveScan = async (userId, scan) => {
  if (!db || !userId || !scan?.id) return;
  try {
    // Never store raw base64 in Firestore — strip it before saving
    const { image: _stripped, ...scanToSave } = scan;
    await setDoc(doc(scansRef(userId), scan.id), scanToSave, { merge: true });
  } catch (err) {
    console.error('[scanHistoryService] saveScan error:', err);
  }
};

/**
 * Delete a scan document from Firestore AND its image from Storage.
 */
export const deleteScan = async (userId, scanId) => {
  if (!db || !userId || !scanId) return;
  try {
    await deleteDoc(doc(scansRef(userId), scanId));
  } catch {
    // Ignore missing document errors
  }
  if (storage) {
    try {
      await deleteObject(ref(storage, `scan_images/${userId}/${scanId}`));
    } catch {
      // Ignore if image doesn't exist in storage
    }
  }
};

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const envText = fs.readFileSync('.env', 'utf8');
const env = {};
envText.split('\n').filter(Boolean).forEach(line => {
  const [key, ...vals] = line.split('=');
  if(key && !key.startsWith('#')) env[key.trim()] = vals.join('=').trim().replace(/'|"/g, '');
});

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    const q1 = query(collection(db, "users"), where("username", "==", "Rufas"));
    const q2 = query(collection(db, "users"), where("username", "==", "rufas"));
    
    let fired = false;
    
    for (const q of [q1, q2]) {
        const snapshot = await getDocs(q);
        snapshot.forEach((d) => {
            updateDoc(doc(db, "users", d.id), { role: "admin" }).then(() => {
                console.log("Successfully made " + d.data().username + " an admin!");
            });
            fired = true;
        });
    }
    
    if(!fired) {
        // Just make the first user found an admin
        const snapshot = await getDocs(collection(db, "users"));
        snapshot.forEach((d) => {
            updateDoc(doc(db, "users", d.id), { role: "admin" });
            console.log("Made arbitrary user " + d.data().username + " an admin");
        });
    }
}
run();

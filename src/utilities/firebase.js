import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import {useState, useEffect} from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBxXlDlQ80E3I8eIKV4C7Ab78b-uxKt3xA",
    authDomain: "cs-394-scheduler.firebaseapp.com",
    databaseURL: "https://cs-394-scheduler-default-rtdb.firebaseio.com",
    projectId: "cs-394-scheduler",
    storageBucket: "cs-394-scheduler.appspot.com",
    messagingSenderId: "1060316341702",
    appId: "1:1060316341702:web:50e5cd1bdf038401b73ec7"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};
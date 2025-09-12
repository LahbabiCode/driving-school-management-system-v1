import { useState, useEffect } from 'react';

// Helper function to get value from localStorage
function getStorageValue<T>(key: string, defaultValue: T): T {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error("Error parsing JSON from localStorage", error);
                return defaultValue;
            }
        }
    }
    return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting item to localStorage", error);
        }
    }, [key, value]);

    return [value, setValue];
}

import { useEffect, useState } from "react";
import { DEFAULT_PREFERENCE } from "../util/config";

export default function usePreferences() {
    const [preferences, setPreferences] = useState(() => {
        const saved = localStorage.getItem('preferences');
        return saved ? {...DEFAULT_PREFERENCE, ...JSON.parse(saved)} : DEFAULT_PREFERENCE;
    });

    useEffect(() => localStorage.setItem('preferences', JSON.stringify(preferences)), [preferences])

    return {preferences, setPreferences};
}
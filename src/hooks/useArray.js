import { useState, useCallback } from "react";

function useArray(initialValue = []) {
    const [value, setValue] = useState(initialValue);

    const push = useCallback((element) => {
        setValue((oldValue) => [...oldValue, element]);
    }, []);

    const remove = (index) => {
        setValue((oldValue) => oldValue.filter((_, i) => i !== index));
    };

    const isEmpty = () => value.length === 0;

    const clearArray = () => {
        setValue([]);
    };

    return { value, setValue, push, remove, isEmpty, clearArray };
}

export default useArray;

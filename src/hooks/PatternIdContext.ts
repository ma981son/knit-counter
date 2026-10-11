import { createContext, useContext } from 'react';

export const PatternIdContext = createContext<string | undefined>(undefined);

export function usePatternId() {
    return useContext(PatternIdContext);
}
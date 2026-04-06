import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';

interface ToolBagContextType {
  savedTools: Product[];
  requestedTools: Product[];
  addTool: (product: Product) => void;
  removeTool: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  clearBag: () => void;
  submitRequest: () => void;
  isBagOpen: boolean;
  setIsBagOpen: (isOpen: boolean) => void;
}

const ToolBagContext = createContext<ToolBagContextType | undefined>(undefined);

const STORAGE_KEY = 'stacklist_tool_bag';
const REQUESTED_STORAGE_KEY = 'stacklist_requested_tools';

export function ToolBagProvider({ children }: { children: React.ReactNode }) {
  const [savedTools, setSavedTools] = useState<Product[]>([]);
  const [requestedTools, setRequestedTools] = useState<Product[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedBag = localStorage.getItem(STORAGE_KEY);
      if (storedBag) {
        setSavedTools(JSON.parse(storedBag));
      }
      const storedRequested = localStorage.getItem(REQUESTED_STORAGE_KEY);
      if (storedRequested) {
        setRequestedTools(JSON.parse(storedRequested));
      }
    } catch (e) {
      console.warn('Failed to parse state from local storage:', e);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTools));
      localStorage.setItem(REQUESTED_STORAGE_KEY, JSON.stringify(requestedTools));
    } catch (e) {
      console.warn('Failed to save state to local storage:', e);
    }
  }, [savedTools, requestedTools, loaded]);

  const addTool = useCallback((product: Product) => {
    setSavedTools((prev) => {
      // Prevent duplicates
      if (prev.some((p) => p.slug === product.slug)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeTool = useCallback((slug: string) => {
    setSavedTools((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const isSaved = useCallback(
    (slug: string) => {
      return savedTools.some((p) => p.slug === slug);
    },
    [savedTools]
  );

  const clearBag = useCallback(() => {
    setSavedTools([]);
  }, []);

  const submitRequest = useCallback(() => {
    const newRequested = [...requestedTools];
    savedTools.forEach(tool => {
        // Only add if it's not already in requestedTools
        if (!newRequested.some(req => req.slug === tool.slug)) {
            newRequested.push(tool);
        }
    });

    setRequestedTools(newRequested);
    setSavedTools([]);
  }, [savedTools, requestedTools]);

  return (
    <ToolBagContext.Provider
      value={{
        savedTools,
        requestedTools,
        addTool,
        removeTool,
        isSaved,
        clearBag,
        submitRequest,
        isBagOpen,
        setIsBagOpen,
      }}
    >
      {children}
    </ToolBagContext.Provider>
  );
}

export function useToolBag() {
  const ctx = useContext(ToolBagContext);
  if (!ctx) {
    throw new Error('useToolBag must be used within a ToolBagProvider');
  }
  return ctx;
}

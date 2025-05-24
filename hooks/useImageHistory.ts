import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryItem {
  id?: string;
  imageUrl: string;
  prompt: string;
  timestamp: string;
}

export function useImageHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Load history from storage on mount
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('imageHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };
  
  const saveHistory = async (newHistory: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem('imageHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };
  
  const addToHistory = (item: HistoryItem) => {
    // Generate a unique ID if not provided
    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
    };
    
    // Add to the beginning of the array (most recent first)
    const updatedHistory = [newItem, ...history].slice(0, 50); // Limit to 50 items
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };
  
  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };
  
  return {
    history,
    addToHistory,
    clearHistory,
  };
}
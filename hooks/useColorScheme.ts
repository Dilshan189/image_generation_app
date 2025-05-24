import { useState, useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ColorScheme = 'light' | 'dark';

export function useColorScheme() {
  const systemColorScheme = useNativeColorScheme() as ColorScheme;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user preference on mount
  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const storedScheme = await AsyncStorage.getItem('colorScheme');
        if (storedScheme) {
          setColorScheme(storedScheme as ColorScheme);
        } else {
          setColorScheme(systemColorScheme);
        }
      } catch (error) {
        console.error('Error loading color scheme:', error);
        setColorScheme(systemColorScheme);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadColorScheme();
  }, [systemColorScheme]);
  
  const toggleColorScheme = async () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    
    try {
      await AsyncStorage.setItem('colorScheme', newScheme);
    } catch (error) {
      console.error('Error saving color scheme:', error);
    }
  };
  
  return {
    colorScheme,
    toggleColorScheme,
    isLoading,
  };
}
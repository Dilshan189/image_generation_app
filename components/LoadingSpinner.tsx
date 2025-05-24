import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ 
  size = 24, 
  color = '#6D28D9' 
}: LoadingSpinnerProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    animation.start();
    
    return () => {
      animation.stop();
    };
  }, []);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.spinner,
          { 
            width: size, 
            height: size, 
            borderColor: color,
            transform: [{ rotate: spin }],
          },
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 50,
    borderTopColor: 'transparent',
  },
});
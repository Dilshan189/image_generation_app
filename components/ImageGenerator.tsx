import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { Wand as Wand2 } from 'lucide-react-native';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageGeneratorProps {
  prompt: string;
  setPrompt: (text: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  error: string | null;
}

export function ImageGenerator({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  onGenerate,
  error
}: ImageGeneratorProps) {
  // Animation for the input and button
  const inputOpacity = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(inputTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.inputContainer,
          { 
            opacity: inputOpacity,
            transform: [{ translateY: inputTranslateY }]
          }
        ]}
      >
        <Text style={styles.title}>Create with AI</Text>
        <Text style={styles.subtitle}>
          Enter a prompt to generate an image
        </Text>
        
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Describe the image you want to create..."
            placeholderTextColor="#94A3B8"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={Platform.OS === 'web' ? 1 : 3}
            textAlignVertical="top"
            editable={!isGenerating}
            autoFocus
          />
        </View>
        
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        
        <TouchableOpacity
          style={[
            styles.generateButton,
            isGenerating ? styles.generateButtonDisabled : null
          ]}
          onPress={onGenerate}
          disabled={isGenerating || !prompt.trim()}
          activeOpacity={0.8}
        >
          {isGenerating ? (
            <LoadingSpinner size={24} color="#ffffff" />
          ) : (
            <>
              <Wand2 size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.generateButtonText}>Generate Image</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
      
      {isGenerating && (
        <View style={styles.loadingContainer}>
          <LoadingSpinner size={48} color="#6D28D9" />
          <Text style={styles.loadingText}>
            Creating your masterpiece...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#334155',
    minHeight: 60,
    maxHeight: 120,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#A78BFA',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6D28D9',
    fontWeight: '500',
  },
});
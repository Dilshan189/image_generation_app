import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { ImageGenerator } from '@/components/ImageGenerator';
import { ImageResult } from '@/components/ImageResult';
import { generateImage } from '@/services/imageGenerationService';

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt first');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setPrompt('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {!generatedImage ? (
            <ImageGenerator
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              error={error}
            />
          ) : (
            <ImageResult 
              imageUrl={generatedImage} 
              prompt={prompt}
              onReset={handleReset}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
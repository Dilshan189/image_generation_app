import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Platform,
  Animated,
  Easing,
  Alert,
  Linking
} from 'react-native';
import { Download, RefreshCw } from 'lucide-react-native';
import { useImageHistory } from '@/hooks/useImageHistory';
import { BlurView } from 'expo-blur';

interface ImageResultProps {
  imageUrl: string;
  prompt: string;
  onReset: () => void;
}

export function ImageResult({ imageUrl, prompt, onReset }: ImageResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { addToHistory } = useImageHistory();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  useEffect(() => {
    // Add the generated image to history
    addToHistory({ imageUrl, prompt, timestamp: new Date().toISOString() });
    
    // Play entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.back()),
      }),
    ]).start();
  }, []);
  
  const handleDownload = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Download Unavailable',
        'Image downloading is only available on web. You can view this image in your history.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setIsDownloading(true);
    
    try {
      // For web, we'll open the image in a new tab to let the user save it
      Linking.openURL(imageUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert(
        'Download Failed',
        'There was an error downloading the image.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {Platform.OS === 'ios' ? (
          <BlurView intensity={30} style={styles.controlsContainer}>
            <ControlsContent 
              prompt={prompt}
              isDownloading={isDownloading}
              onDownload={handleDownload}
              onReset={onReset}
            />
          </BlurView>
        ) : (
          <View style={styles.fallbackControlsContainer}>
            <ControlsContent 
              prompt={prompt}
              isDownloading={isDownloading}
              onDownload={handleDownload}
              onReset={onReset}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

interface ControlsContentProps {
  prompt: string;
  isDownloading: boolean;
  onDownload: () => void;
  onReset: () => void;
}

function ControlsContent({ prompt, isDownloading, onDownload, onReset }: ControlsContentProps) {
  return (
    <>
      <Text style={styles.promptText} numberOfLines={2}>
        {prompt}
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={onDownload}
          disabled={isDownloading}
        >
          <Download size={20} color="#ffffff" style={styles.buttonIcon} />
          <Text style={styles.downloadButtonText}>
            {isDownloading ? 'Downloading...' : 'Download'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.resetButton}
          onPress={onReset}
        >
          <RefreshCw size={20} color="#6D28D9" style={styles.buttonIcon} />
          <Text style={styles.resetButtonText}>New Image</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  fallbackControlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  promptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D28D9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    marginLeft: 8,
  },
  resetButtonText: {
    color: '#6D28D9',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonIcon: {
    marginRight: 6,
  },
});
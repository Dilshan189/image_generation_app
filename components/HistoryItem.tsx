import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, Platform } from 'react-native';
import { Clock, Share2 } from 'lucide-react-native';
import { formatRelativeTime } from '@/utils/dateUtils';

interface HistoryItemProps {
  item: {
    id: string;
    imageUrl: string;
    prompt: string;
    timestamp: string;
  };
}

export function HistoryItem({ item }: HistoryItemProps) {
  const timeAgo = formatRelativeTime(new Date(item.timestamp));
  
  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        // On web, we'll create a copy-to-clipboard function
        navigator.clipboard.writeText(item.imageUrl);
        alert('Image URL copied to clipboard!');
      } else {
        // On native platforms, use the Share API
        await Share.share({
          message: `Check out this AI-generated image: ${item.imageUrl}`,
          url: item.imageUrl,
        });
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.prompt} numberOfLines={2}>
          {item.prompt}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.timestampContainer}>
            <Clock size={14} color="#94A3B8" style={styles.icon} />
            <Text style={styles.timestamp}>{timeAgo}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Share2 size={14} color="#6D28D9" />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  prompt: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#94A3B8',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F3E8FF',
    borderRadius: 4,
  },
  shareText: {
    fontSize: 12,
    color: '#6D28D9',
    fontWeight: '500',
    marginLeft: 4,
  },
});
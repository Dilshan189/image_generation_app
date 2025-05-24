import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { History, Settings, Image as ImageIcon } from 'lucide-react-native';

interface EmptyStateProps {
  icon: 'history' | 'settings' | 'image';
  title: string;
  message: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'history':
        return <History size={48} color="#CBD5E1" />;
      case 'settings':
        return <Settings size={48} color="#CBD5E1" />;
      case 'image':
        return <ImageIcon size={48} color="#CBD5E1" />;
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
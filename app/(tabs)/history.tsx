import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useImageHistory } from '@/hooks/useImageHistory';
import { HistoryItem } from '@/components/HistoryItem';
import { EmptyState } from '@/components/EmptyState';

export default function HistoryScreen() {
  const { history, clearHistory } = useImageHistory();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generation History</Text>
        {history.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={clearHistory}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <EmptyState 
          icon="history"
          title="No History Yet"
          message="Generated images will appear here"
        />
      ) : (
        <FlatList
          data={history}
          renderItem={({ item }) => <HistoryItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});
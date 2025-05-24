import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Linking, ScrollView } from 'react-native';
import { ExternalLink, CircleHelp as HelpCircle, Info, Moon } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  const openPrivacyPolicy = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };
  
  const openHelpCenter = () => {
    Linking.openURL('https://example.com/help');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Moon size={20} color="#64748B" style={styles.icon} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleColorScheme}
            trackColor={{ false: '#CBD5E1', true: '#A78BFA' }}
            thumbColor={colorScheme === 'dark' ? '#6D28D9' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.settingItem} onPress={openPrivacyPolicy}>
          <View style={styles.settingLabelContainer}>
            <Info size={20} color="#64748B" style={styles.icon} />
            <Text style={styles.settingLabel}>Privacy Policy</Text>
          </View>
          <ExternalLink size={18} color="#94A3B8" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={openHelpCenter}>
          <View style={styles.settingLabelContainer}>
            <HelpCircle size={20} color="#64748B" style={styles.icon} />
            <Text style={styles.settingLabel}>Help Center</Text>
          </View>
          <ExternalLink size={18} color="#94A3B8" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6D28D9',
    marginBottom: 8,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  icon: {
    marginRight: 12,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
import { Tabs } from 'expo-router';
import { Image as ImageIcon, Settings, History } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6D28D9',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#F8FAFC',
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Generate',
          tabBarIcon: ({ color, size }) => (
            <ImageIcon size={size} color={color} />
          ),
          headerTitle: 'AI Image Generator',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AudioProvider } from './src/context/AudioContext';
import MixerScreen from './src/screens/MixerScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import EffectsScreen from './src/screens/EffectsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Mixer') {
                iconName = focused ? 'radio' : 'radio-outline';
              } else if (route.name === 'Library') {
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              } else if (route.name === 'Effects') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cog-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00d4ff',
            tabBarInactiveTintColor: '#666',
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#1a1a1a',
              borderTopColor: '#333',
            },
          })}
        >
          <Tab.Screen name="Mixer" component={MixerScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Effects" component={EffectsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AudioProvider>
  );
}

import React from 'react';
import { StyleSheet, View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';

export default function SettingsScreen() {
  const { bpm, setBpm } = useAudio();
  const [beatSync, setBeatSync] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações de Áudio</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="speedometer" size={24} color="#00d4ff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>BPM</Text>
                <Text style={styles.settingValue}>{bpm} BPM</Text>
              </View>
            </View>
            <View style={styles.bpmControls}>
              <TouchableOpacity 
                style={styles.bpmButton}
                onPress={() => setBpm(Math.max(60, bpm - 1))}
              >
                <Text style={styles.bpmButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.bpmButton}
                onPress={() => setBpm(Math.min(220, bpm + 1))}
              >
                <Text style={styles.bpmButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="musical-notes" size={24} color="#00d4ff" />
              <Text style={styles.settingLabel}>Sincronizar Beat</Text>
            </View>
            <Switch 
              value={beatSync}
              onValueChange={setBeatSync}
              trackColor={{ false: '#333', true: '#00d4ff' }}
              thumbColor={beatSync ? '#fff' : '#888'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color="#00d4ff" />
              <Text style={styles.settingLabel}>Notificações</Text>
            </View>
            <Switch 
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#333', true: '#00d4ff' }}
              thumbColor={notifications ? '#fff' : '#888'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Versão</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Desenvolvido por</Text>
            <Text style={styles.aboutValue}>DJ Jay Team</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  section: {
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  sectionTitle: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingValue: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  bpmControls: {
    flexDirection: 'row',
  },
  bpmButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bpmButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  aboutLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutValue: {
    color: '#888',
    fontSize: 14,
  },
});

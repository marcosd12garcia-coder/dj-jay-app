import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudio } from '../context/AudioContext';

export default function MasterControls() {
  const { masterVolume, setMasterVolume, isPlaying, setIsPlaying } = useAudio();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DJ JAY</Text>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons 
            name={isPlaying ? 'pause' : 'play'} 
            size={24} 
            color="#000" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.masterVolume}>
        <View style={styles.volumeLabel}>
          <Ionicons name="volume-high" size={20} color="#00d4ff" />
          <Text style={styles.label}>Master Volume</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={masterVolume}
          onValueChange={setMasterVolume}
          minimumTrackTintColor="#00d4ff"
          maximumTrackTintColor="#333"
          thumbTintColor="#00d4ff"
        />
        <Text style={styles.volumeValue}>{Math.round(masterVolume * 100)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#00d4ff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  masterVolume: {
    marginTop: 8,
  },
  volumeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  volumeValue: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
});

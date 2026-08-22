import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudio } from '../context/AudioContext';

const { width } = Dimensions.get('window');
const TRACK_WIDTH = width * 0.25;

export default function TrackMixer({ track, isSelected, onSelect }) {
  const { playTrack, pauseTrack, setTrackVolume, muteTrack, removeTrack } = useAudio();
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);

  const handleVolumeChange = (value) => {
    setVolume(value);
    setTrackVolume(track.id, value);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    muteTrack(track.id);
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isSelected && styles.containerSelected
      ]}
      onPress={onSelect}
    >
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={2}>
          {track.name.substring(0, 20)}
        </Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => removeTrack(track.id)}
        >
          <Ionicons name="close" size={16} color="#ff6b6b" />
        </TouchableOpacity>
      </View>

      <View style={styles.waveform}>
        <View style={styles.waveformBars}>
          {[...Array(15)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: Math.random() * 60 + 10,
                  backgroundColor: track.isPlaying ? '#00d4ff' : '#333',
                }
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => track.isPlaying ? pauseTrack(track.id) : playTrack(track.id)}
        >
          <Ionicons 
            name={track.isPlaying ? 'pause' : 'play'} 
            size={20} 
            color="#000" 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.muteButton,
            isMuted && styles.muteButtonActive
          ]}
          onPress={handleMute}
        >
          <Ionicons 
            name={isMuted ? 'volume-off' : 'volume-high'} 
            size={16} 
            color={isMuted ? '#ff6b6b' : '#00d4ff'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#00d4ff"
          maximumTrackTintColor="#333"
          thumbTintColor="#00d4ff"
          vertical
        />
      </View>

      <Text style={styles.volumeLabel}>
        {Math.round(volume * 100)}%
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TRACK_WIDTH,
    height: 350,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  containerSelected: {
    borderColor: '#00d4ff',
    backgroundColor: '#1a2a2a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  waveform: {
    height: 80,
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
  },
  bar: {
    width: 3,
    borderRadius: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00d4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a1a1a',
    borderColor: '#00d4ff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButtonActive: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  sliderContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  slider: {
    width: 40,
    height: 100,
  },
  volumeLabel: {
    color: '#888',
    fontSize: 10,
    textAlign: 'center',
  },
});

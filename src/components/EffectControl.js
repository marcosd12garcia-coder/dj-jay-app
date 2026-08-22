import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';

export default function EffectControl({ label, value, icon, trackId, effectType }) {
  const { setEffect } = useAudio();
  const [effectValue, setEffectValue] = React.useState(value);

  const handleChange = (val) => {
    setEffectValue(val);
    setEffect(trackId, effectType, val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Ionicons name={icon} size={24} color="#00d4ff" />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{Math.round(effectValue * 100)}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={effectValue}
        onValueChange={handleChange}
        minimumTrackTintColor="#00d4ff"
        maximumTrackTintColor="#333"
        thumbTintColor="#00d4ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  value: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

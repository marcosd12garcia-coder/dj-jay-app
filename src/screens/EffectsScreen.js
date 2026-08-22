import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import EffectControl from '../components/EffectControl';

export default function EffectsScreen() {
  const { tracks } = useAudio();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const selectedTrackData = tracks.find(t => t.id === selectedTrack);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Efeitos de Áudio</Text>
        <Text style={styles.subtitle}>Customize os efeitos de cada faixa</Text>
      </View>

      {tracks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="musical-notes" size={64} color="#666" />
          <Text style={styles.emptyText}>Nenhuma faixa carregada</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.tracksSelector}>
            <Text style={styles.selectLabel}>Selecione a faixa:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tracks.map(track => (
                <TouchableOpacity
                  key={track.id}
                  style={[
                    styles.trackButton,
                    selectedTrack === track.id && styles.trackButtonActive
                  ]}
                  onPress={() => setSelectedTrack(track.id)}
                >
                  <Text style={styles.trackButtonText}>{track.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedTrackData && (
            <View style={styles.effectsContainer}>
              <EffectControl 
                label="Reverb"
                value={0}
                icon="water"
                trackId={selectedTrack}
                effectType="reverb"
              />
              <EffectControl 
                label="Delay"
                value={0}
                icon="timer"
                trackId={selectedTrack}
                effectType="delay"
              />
              <EffectControl 
                label="Filter"
                value={0}
                icon="funnel"
                trackId={selectedTrack}
                effectType="filter"
              />
              <EffectControl 
                label="Pitch"
                value={0}
                icon="musical-note"
                trackId={selectedTrack}
                effectType="pitch"
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  tracksSelector: {
    padding: 20,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  selectLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  trackButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    borderColor: '#333',
    borderWidth: 1,
    marginRight: 8,
  },
  trackButtonActive: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  effectsContainer: {
    padding: 20,
  },
});

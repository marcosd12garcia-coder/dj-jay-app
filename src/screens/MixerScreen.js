import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import TrackMixer from '../components/TrackMixer';
import MasterControls from '../components/MasterControls';

const { width } = Dimensions.get('window');

export default function MixerScreen() {
  const { tracks, playTrack, pauseTrack } = useAudio();
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <View style={styles.container}>
      <MasterControls />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tracksContainer}
      >
        {tracks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes" size={64} color="#666" />
            <Text style={styles.emptyText}>Nenhuma faixa adicionada</Text>
            <Text style={styles.emptySubtext}>Vá para Biblioteca para adicionar músicas</Text>
          </View>
        ) : (
          tracks.map((track) => (
            <TrackMixer 
              key={track.id} 
              track={track}
              isSelected={selectedTrack === track.id}
              onSelect={() => setSelectedTrack(track.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  tracksContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
});

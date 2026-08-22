import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';

export default function LibraryScreen() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addTrack } = useAudio();

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const allAssets = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
        });
        setSongs(allAssets.assets);
      }
    } catch (error) {
      console.error('Error loading songs:', error);
      Alert.alert('Erro', 'Não foi possível carregar a biblioteca de músicas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrack = async (song) => {
    try {
      const uri = song.uri;
      const name = song.filename;
      await addTrack(uri, name);
      Alert.alert('Sucesso', `${name} adicionado ao mixer`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a faixa');
    }
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity 
      style={styles.songItem}
      onPress={() => handleAddTrack(item)}
    >
      <Ionicons name="musical-note" size={32} color="#00d4ff" style={styles.icon} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.filename}
        </Text>
        <Text style={styles.songDuration}>
          {Math.floor(item.duration / 1000 / 60)}:{Math.floor((item.duration / 1000) % 60).toString().padStart(2, '0')}
        </Text>
      </View>
      <Ionicons name="add-circle" size={24} color="#00d4ff" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando biblioteca...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {songs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="musical-notes" size={64} color="#666" />
          <Text style={styles.emptyText}>Nenhuma música encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  songItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songDuration: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});

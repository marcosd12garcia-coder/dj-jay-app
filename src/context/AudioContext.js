import React, { createContext, useContext, useState, useRef } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(1);
  
  const soundObjectsRef = useRef({});
  const metronomeSoundRef = useRef(null);

  const addTrack = async (uri, name) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri });
      
      const trackId = Date.now().toString();
      soundObjectsRef.current[trackId] = {
        sound,
        volume: 1,
        muted: false,
        effects: {
          reverb: 0,
          delay: 0,
          filter: 0,
        },
      };

      setTracks(prev => [...prev, {
        id: trackId,
        name,
        uri,
        duration: 0,
        isPlaying: false,
      }]);

      return trackId;
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const playTrack = async (trackId) => {
    try {
      const trackData = soundObjectsRef.current[trackId];
      if (trackData) {
        await trackData.sound.playAsync();
        setTracks(prev => prev.map(t => 
          t.id === trackId ? { ...t, isPlaying: true } : t
        ));
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const pauseTrack = async (trackId) => {
    try {
      const trackData = soundObjectsRef.current[trackId];
      if (trackData) {
        await trackData.sound.pauseAsync();
        setTracks(prev => prev.map(t => 
          t.id === trackId ? { ...t, isPlaying: false } : t
        ));
      }
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  };

  const setTrackVolume = (trackId, volume) => {
    const trackData = soundObjectsRef.current[trackId];
    if (trackData) {
      trackData.volume = volume;
      trackData.sound.setVolumeAsync(volume * masterVolume);
    }
  };

  const muteTrack = (trackId) => {
    const trackData = soundObjectsRef.current[trackId];
    if (trackData) {
      trackData.muted = !trackData.muted;
      trackData.sound.setVolumeAsync(trackData.muted ? 0 : trackData.volume * masterVolume);
    }
  };

  const setEffect = (trackId, effectType, value) => {
    const trackData = soundObjectsRef.current[trackId];
    if (trackData) {
      trackData.effects[effectType] = value;
      // Effects processing will be implemented with audio nodes
    }
  };

  const removeTrack = async (trackId) => {
    try {
      const trackData = soundObjectsRef.current[trackId];
      if (trackData) {
        await trackData.sound.unloadAsync();
        delete soundObjectsRef.current[trackId];
      }
      setTracks(prev => prev.filter(t => t.id !== trackId));
    } catch (error) {
      console.error('Error removing track:', error);
    }
  };

  const value = {
    tracks,
    isPlaying,
    setIsPlaying,
    bpm,
    setBpm,
    masterVolume,
    setMasterVolume,
    addTrack,
    playTrack,
    pauseTrack,
    setTrackVolume,
    muteTrack,
    setEffect,
    removeTrack,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import TrackPlayer, { type Track } from "react-native-track-player";

export const useQueueTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTracks = async () => {
        const queue = await TrackPlayer.getQueue();
        setTracks(queue);
      };

      fetchTracks();
    }, [])
  );

  return tracks;
};

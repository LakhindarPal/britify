import { useCallback, useEffect, useState } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

export const useRepeatMode = () => {
  const [repeatStatus, setRepeatStatus] = useState<RepeatMode>(RepeatMode.Off);

  const cycleRepeatMode = useCallback(async () => {
    const newMode = (repeatStatus + 1) % 3;
    await TrackPlayer.setRepeatMode(newMode);
    setRepeatStatus(newMode);
  }, [repeatStatus, setRepeatStatus]);

  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatStatus);
  }, [setRepeatStatus]);

  return { repeatMode: repeatStatus, cycleRepeatMode };
};

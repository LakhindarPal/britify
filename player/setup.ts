import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player"

 export async function setupPlayer() {
	await TrackPlayer.setupPlayer({ maxCacheSize: 1024 * 10 });

	await TrackPlayer.updateOptions({
		android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
    },
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
      Capability.SeekTo,
		],
		compactCapabilities: [Capability.Play, Capability.Pause],
	})

	await TrackPlayer.setVolume(1)
}
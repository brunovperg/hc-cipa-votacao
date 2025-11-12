import { useState, useEffect } from 'react';

interface PreloadedAssets {
	images: Record<string, string>;
	sounds: Record<string, HTMLAudioElement>;
}

export const useAssetPreloader = () => {
	const [assetsLoaded, setAssetsLoaded] = useState(false);
	const [preloadedAssets, setPreloadedAssets] = useState<PreloadedAssets>({
		images: {},
		sounds: {},
	});

	useEffect(() => {
		const preloadAssets = async () => {
			// Fetch candidate numbers from API
			let candidateNumbers: number[] = [10, 20, 30, 40, 50, 60]; // Fallback
			try {
				const response = await fetch('/api/get-candidates');
				if (response.ok) {
					const data = await response.json();
					candidateNumbers = data.candidates.map(
						(c: { number: number }) => c.number
					);
				}
			} catch (error) {
				console.warn(
					'Failed to fetch candidates for preloading, using fallback:',
					error
				);
			}

			const soundFiles = ['numero_urna.mp3', 'confirma_urna.mp3']; // Add all your sound files

			const imagePromises: Promise<void>[] = [];
			const loadedImages: Record<string, string> = {};
			const loadedSounds: Record<string, HTMLAudioElement> = {};

			// Preload candidate images
			candidateNumbers.forEach((number) => {
				const imagePromise = new Promise<void>((resolve) => {
					const img = new Image();
					img.onload = () => {
						loadedImages[
							number.toString()
						] = `/candidates/${number}.png`;

						resolve();
					};
					img.onerror = () => {
						console.warn(
							`Failed to load image for candidate ${number}`
						);
						resolve(); // Don't reject, just continue
					};
					img.src = `/candidates/${number}.png`;
				});
				imagePromises.push(imagePromise);
			});

			// Preload user placeholder image
			const userImagePromise = new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => {
					loadedImages['user'] = '/candidates/user.png';
					resolve();
				};
				img.onerror = () => {
					console.warn('Failed to load user placeholder image');
					resolve();
				};
				img.src = '/candidates/user.png';
			});
			imagePromises.push(userImagePromise);

			// Preload sounds
			soundFiles.forEach((soundFile) => {
				try {
					const audio = new Audio(`/sounds/${soundFile}`);
					audio.preload = 'auto';
					audio.load();
					loadedSounds[soundFile.replace('.mp3', '')] = audio;
				} catch (error) {
					console.warn(
						`Failed to load sound: ${soundFile}`,
						error
					);
				}
			});

			// Wait for all images to load
			await Promise.all(imagePromises);

			setPreloadedAssets({
				images: loadedImages,
				sounds: loadedSounds,
			});

			setAssetsLoaded(true);
		};

		preloadAssets();
	}, []);

	const getImageSrc = (candidateNumber: string | number): string => {
		const key = candidateNumber.toString();
		return (
			preloadedAssets.images[key] ||
			preloadedAssets.images['user'] ||
			'/candidates/user.png'
		);
	};

	const playSound = (soundName: string): void => {
		const sound = preloadedAssets.sounds[soundName];
		if (sound) {
			sound.currentTime = 0; // Reset to beginning
			sound.play().catch((err) =>
				console.warn('Failed to play sound:', err)
			);
		} else {
			console.warn(`Sound not found: ${soundName}`);
		}
	};

	return {
		assetsLoaded,
		preloadedAssets,
		getImageSrc,
		playSound,
	};
};

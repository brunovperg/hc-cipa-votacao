import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface AssetContextType {
	getImageSrc: (candidateNumber: string | number) => string;
	playSound: (soundName: string) => void;
	assetsLoaded: boolean;
}

const AssetContext = createContext<AssetContextType | null>(null);

export const AssetProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: AssetContextType;
}) => {
	return (
		<AssetContext.Provider value={value}>
			{children}
		</AssetContext.Provider>
	);
};

export const useAssets = () => {
	const context = useContext(AssetContext);
	if (!context) {
		throw new Error('useAssets must be used within an AssetProvider');
	}
	return context;
};

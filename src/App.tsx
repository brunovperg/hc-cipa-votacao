import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CandidatesProvider } from './hooks/CandidatesContext';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { AssetProvider } from './contexts/AssetContext';
import BaseLayout from './pages/Layout';
import Voting from './pages/Voting';
import { EmployeesProvider } from './contexts/EmloyeesContext';

function App() {
	const assetPreloader = useAssetPreloader();
	const { assetsLoaded } = assetPreloader;

	if (!assetsLoaded) {
		return (
			<div className='h-screen flex items-center justify-center bg-blue-800'>
				<div className='text-white text-center'>
					<div className='text-2xl font-bold mb-4'>
						Carregando Sistema de Votação...
					</div>
					<div className='text-lg'>Preparando recursos...</div>
					<div className='mt-4 animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto'></div>
				</div>
			</div>
		);
	}

	return (
		<AssetProvider value={assetPreloader}>
			<CandidatesProvider>
				<EmployeesProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<BaseLayout />}>
								<Route index element={<Voting />} />
								<Route path='admin' />
								<Route
									path='*'
									element={<h1>Not Found</h1>}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</EmployeesProvider>
			</CandidatesProvider>
		</AssetProvider>
	);
}
export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CandidatesProvider } from './hooks/CandidatesContext';
import BaseLayout from './pages/Layout';
import Voting from './pages/Voting';

function App() {
	return (
		<>
			<CandidatesProvider>
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
			</CandidatesProvider>
		</>
	);
}
export default App;

import { Outlet } from 'react-router-dom';
import LogoCirurgia from '../../assets/logomarca_hc_svg.svg?react';
import BackgroundHc from '../../assets/background_hc.jpeg';
import LogoCipa from '../../assets/logo_cipa.png';

const BaseLayout = () => {
	return (
		<div className='bg-transparent min-h-screen h-lvh text-white'>
			{/* put backgorund image */}
			<div className='absolute -z-1 w-dvw h-dvh'>
				<img
					src={BackgroundHc}
					alt=''
					className='h-full w-full fixed top-0 left-0'
				/>
			</div>
			<div className='fixed h-dvh pt-10 left-[75%] flex flex-col items-center'>
				<h1 className='outline-text font-bold text-4xl'>
					Eleições
				</h1>
				<img src={LogoCipa} alt='' className=' my-4 w-56 h-w-56' />
				<h1 className='outline-text font-bold text-4xl'>
					2025/2026
				</h1>
			</div>
			<div className='flex justify-center py-4'>
				<LogoCirurgia
					className='  text-white w-full'
					style={{ height: '3.5rem' }}
				/>
			</div>
			<Outlet />
		</div>
	);
};
export default BaseLayout;

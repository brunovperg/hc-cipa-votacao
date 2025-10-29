import { Outlet } from 'react-router-dom';
import LogoCirurgia from '../../assets/logomarca_hc_svg.svg?react';

const BaseLayout = () => {
	return (
		<div className='bg-[#0b1359] min-h-screen h-lvh text-white'>
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

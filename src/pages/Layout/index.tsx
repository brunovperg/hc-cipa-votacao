import { Outlet } from 'react-router-dom';
import Logo from '../../assets/cirurgia-logo-full.png';

const BaseLayout = () => {
	return (
		<div className='bg-[#0b1359] min-h-screen h-lvh text-white'>
			<div className='flex justify-center py-4'>
				<img className='max-w-full h-14' src={Logo} alt='Logo' />
			</div>
			<Outlet />
		</div>
	);
};
export default BaseLayout;

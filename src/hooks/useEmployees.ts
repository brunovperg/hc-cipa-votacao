import { useContext } from 'react';
import { EmployeesContext } from '../contexts/EmloyeesContext';

export const useEmployees = () => {
	const context = useContext(EmployeesContext);
	if (context === undefined) {
		throw new Error(
			'useEmployees must be used within a EmployeesProvider'
		);
	}
	return context;
};

import { createContext, useState } from 'react';
import type { EmployeeType } from '../types/employees';

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [employees, setEmployees] = useState<EmployeeType[]>([
		{ id: 1, matricula: '119621', name: 'User' },
		{ id: 2, matricula: '2405', name: 'Medico' },
		{ id: 3, matricula: '03304', name: 'Enfermeiro' },
	]);
	return (
		<EmployeesContext.Provider value={{ employees, setEmployees }}>
			{children}
		</EmployeesContext.Provider>
	);
};

export const EmployeesContext = createContext<
	| {
			employees: EmployeeType[];
			setEmployees: React.Dispatch<
				React.SetStateAction<EmployeeType[]>
			>;
	  }
	| undefined
>(undefined);

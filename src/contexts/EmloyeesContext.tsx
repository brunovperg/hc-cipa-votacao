import { createContext, useState } from 'react';
import type { EmployeeType } from '../types/employees';
import { funcionarios } from '../pages/Voting/Matricula/funcionarios';

export const EmployeesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [employees, setEmployees] = useState<EmployeeType[]>(funcionarios);
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

import {ChangeEventHandler, FC} from "react";

interface SelectOption {
	id: string,
	name: string
}
interface SelectProps {
	options: SelectOption[],
	multiple?: boolean,
	label: string
	name: string,
	value?: string | string[],
	onChange: ChangeEventHandler<HTMLSelectElement>
}
const Select: FC<SelectProps> = ({ options, multiple = false, label, name, value, onChange }) => {
	return <>
		<label htmlFor={name}>{label}</label>
		<select value={value} onChange={onChange} name={name} id={name} multiple={multiple}>
			{options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
		</select>
	</>
};

export default Select

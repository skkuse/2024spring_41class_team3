import { GithubCard } from './GithubCard';

export const columns = [
	{
		accessorKey: 'id',
		header: '#',
	},
	{
		accessorKey: 'github_id',
		header: 'User name',
		cell: ({ row }) =>
			row.original.github_id ? (
				<GithubCard children={row.original.github_id} />
			) : (
				<div className="text-gray-400">Anonymous</div>
			),
	},
	{
		accessorKey: 'before_carbon',
		header: 'Before CO2',
		cell: ({ row }) => `${row.original.before_carbon.toFixed(2)} g`,
	},
	{
		accessorKey: 'after_carbon',
		header: 'After CO2',
		cell: ({ row }) => `${row.original.after_carbon.toFixed(2)} g`,
	},
	{
		accessorKey: 'runtime',
		header: 'Runtime',
		cell: ({ row }) => `${row.original.runtime.toFixed(3)} s`,
	},
	{
		accessorKey: 'memory',
		header: 'Memory',
		cell: ({ row }) => `${row.original.memory} GB`,
	},
	{
		accessorKey: 'energy_needed',
		header: 'Needed Energy',
		cell: ({ row }) => `${row.original.energy_needed.toFixed(3)} kWh`,
	},
	{
		accessorKey: 'date',
		header: 'Date',
	},
];

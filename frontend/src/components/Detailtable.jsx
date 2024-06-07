import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';

export const DetailTable = ({ data }) => {
	const runtime =
		typeof data.runtime === 'number' ? data.runtime.toFixed(3) : null;
	const memory = data.memory;
	const beforeCarbon =
		typeof data.before_carbon === 'number'
			? data.before_carbon.toFixed(1)
			: null;
	const afterCarbon =
		typeof data.after_carbon === 'number' ? data.after_carbon.toFixed(1) : null;
	const energyNeeded =
		typeof data.energy_needed === 'number'
			? data.energy_needed.toFixed(3)
			: null;

	return (
		data && (
			<div>
				<Table className="w-[660px border-2 border-lime-800/20">
					<TableHeader>
						<TableRow>
							<TableHead>runtime</TableHead>
							<TableHead>memory</TableHead>
							<TableHead>before carbon emission</TableHead>
							<TableHead>after carbon emission</TableHead>
							<TableHead>needed energy</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">{runtime}s</TableCell>
							<TableCell className="text-right">{memory}</TableCell>
							<TableCell className="text-right">{beforeCarbon}g</TableCell>
							<TableCell className="text-right">{afterCarbon}g</TableCell>
							<TableCell className="text-right">{energyNeeded}KWh</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	);
};

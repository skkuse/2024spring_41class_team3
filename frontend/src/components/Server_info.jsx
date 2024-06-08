const Server_info = () => {
	return (
		<div className="w-96 pl-16">
			<h3 className="text-base font-semibold leading-7 text-gray-900">
				Server info.
			</h3>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-200">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							FastAPI
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							Calculate Green-algorithm-based Carbon Emission Logic
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">...</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							...
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default Server_info;

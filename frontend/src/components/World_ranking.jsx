import { world } from '@/components/worlddata';

const World_ranking = () => {
    return (
        <div className="mr-10 w-96">
            <b>TOP Carbon Saving COUNTRY</b> / Carbon(g)
            <ul role="list" className="divide-y divide-gray-200">
                {world
                    .sort((obj1, obj2) => obj2.total_c - obj1.total_c)
                    .map((world) => (
                        <li
                            key={world.country}
                            className="flex justify-between gap-x-6 py-5"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    src={world.imageUrl}
                                    alt=""
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {world.country}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                    {world.total_c}
                                </p>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default World_ranking;
import useGroups from "../hooks/use-groups";

export function AllGroups() {
    const { isPending, isError, data: groups = [] } = useGroups(); // Default `groups` to an empty array.

    // Conditional rendering based on the query state.
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error loading groups!</div>;

    return (
        <div>
            <button>Create New</button>
            {/* Render groups */}
            {groups.length > 0 ? (
                groups.map((group) => (
                    <div key={group.id}>
                        <div>{group.name}</div>
                        <img src={'/images/icons/' + group.image} alt={group.name} />
                    </div>
                ))
            ) : (
                <div>No groups available.</div>
            )}
        </div>
    );
}

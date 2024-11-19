import { useUsers } from "../hooks/useUsers"


export default function AllProfiles() {
  const { data: users, isLoading, isError } = useUsers()
  if(isLoading) return "Loading..."
  if(isError) return <h2>An error has occurred loading users.</h2>
    
    return (
        <div className="UserProfilesList bg-black text-white">blabla bla</div>
    )
}
import { Link } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"



export default function AllProfiles() {
  const { data: users, isLoading, isError } = useUsers()
  if(isLoading) return "Loading..."
  if(isError) return <h2>An error has occurred loading users.</h2>
    
    return (
    <div className="text-red-950">
    <h2 className="text-center mt-4 mb-4">All Profiles</h2>
        <div className="UserProfilesList text-white flex justify-around flex-wrap">
          {users?.map((u) => (<div key={u.id}><div  className="profile text-center justify-center text-red-950">
              <Link to={`/profiles/${u.username}`}><img alt="" className="max-w-48 max-h-48 border-4 rounded-full border-red-950" src={`../images/avatars/${u.image}`}/>{u.username}</Link></div></div>))}           
        </div>
        </div>
    )
}
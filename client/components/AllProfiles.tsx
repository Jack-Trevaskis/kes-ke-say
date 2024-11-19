import { Link } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"



export default function AllProfiles() {
  const { data: users, isLoading, isError } = useUsers()
  if(isLoading) return "Loading..."
  if(isError) return <h2>An error has occurred loading users.</h2>
    
    return (<>
    <h2 className="text-center">All Profiles</h2>
        <div className="UserProfilesList bg-black text-white flex justify-around">
          {users?.map((u) => (<><div className="profile flex-wrap text-center"><li key={u.username}>
              <Link to={`/profiles/${u.username}`}><img alt="" src={`../images/avatars/${u.image}`}/>{u.username}</Link></li></div></>))}           
        </div></>
    )
}
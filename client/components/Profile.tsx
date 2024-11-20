// As a user I want to view my own profile and see an edit button
// As a user I want to view another persons profile (no edit button should show)

import { useParams } from "react-router-dom"
import { useUser } from "../hooks/useUsers"

// The profile should display: Avatar, username, full name and location

const user = {
    username: 'ida',
  }

export default function Profile () {
    const { username }  = useParams() 
    const {data: viewUser, isLoading, isError} = useUser(username)
    if(isLoading) return "Loading..."
    if(isError) return <h2>An error has occurred loading users.</h2>

 const isUserAuth = () => {
    if (user.username === viewUser?.username) {
        return <button className="btn-blue">Edit</button>
    }
  }

    return (
    <>
     <div className="profile bg-red-800 text-white text-center p-4 flex flex-col items-center" >
            <img 
                alt={`${viewUser.username}'s avatar`} 
                className="useravatar max-w-48 max-h-48 border-4 rounded-full border-red-950 bg-gray-100" 
                src={`../images/avatars/${viewUser.image}`} 
            />
            <h2 className="profileName">{viewUser.username}</h2>
            <p className="fullName">{viewUser.fullName}</p>
            <p className="location">{viewUser.location}</p>
            {user && isUserAuth()}
        </div>
    </>
    )
}
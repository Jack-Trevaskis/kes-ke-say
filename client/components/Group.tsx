import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGroups from "../hooks/use-groups";
// import { Group } from '../../models/groups.ts'

export function Group () {

    const [comp, setComp] = useState('')
    const navigate = useNavigate()

    const viewAllGroups = () => {
        navigate('/groups')

    }

    const { id } = useParams(); 
    const groupId = parseInt(id || '', 10); 
    console.log(groupId);

    return (
        <div>
            <button onClick={viewAllGroups} 
            style={{
                backgroundColor: '#007BFF',
                color: '#fff',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}>View All Groups</button>
            <button>View All Posts By Members</button>

            <div>
                <img/>
                <p>Group Name</p>
            </div>

            <div>GroupMemberList.tsx goes here</div>

            <button>Edit Group Profile</button>
            <button>Join Group</button>

        </div>
    )
}
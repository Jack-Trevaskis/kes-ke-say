import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import useGroup from "../hooks/use-group";
import { Group as GroupInterface} from '../../models/groups.ts'

export function Group() {
  const [comp, setComp] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  const groupId = parseInt(id || '', 10);
  console.log(groupId);

  const { isLoading, isError, data: group } = useGroup(groupId); // Default `group` to an empty array

  // Conditional rendering based on the query state.
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  console.log(group)


  const viewAllGroups = () => {
    navigate('/groups')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Group Details
      </h1>

      <button
        onClick={viewAllGroups}
        style={{
          backgroundColor: '#0056D2', // Vibrant blue
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '15px',
        }}
      >
        View All Groups
      </button>

      <button
        style={{
          backgroundColor: '#0056D2', // Vibrant blue
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '30px',
        }}
      >
        View All Posts By Members
      </button>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
        }}
      >
        <img
          src={'/images/icons/' + group.image}
          alt="Group"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '15px',
          }}
        />
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {group.name}

        </p>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '15px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
        }}
      >
        GroupMemberList.tsx goes here
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            backgroundColor: '#0056D2', // Vibrant blue
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Edit Group Profile
        </button>
        <button
          style={{
            backgroundColor: '#0056D2', // Vibrant blue
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Join Group
        </button>
      </div>
    </div>
  )
}

import useGroups from '../hooks/use-groups'
import { Group } from '../../models/groups.ts'
import { useNavigate } from 'react-router-dom'

export function AllGroups() {
  const { isLoading, isError, data: groups } = useGroups() // Default `groups` to an empty array.

  const navigate = useNavigate()

  // Conditional rendering based on the query state.
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading groups</div>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Create New
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {groups.length > 0 ? (
          groups.map((group: Group) => (
            <button
              key={group.id}
              onClick={() => navigate('/groups/' + group.id)}
              style={{
                display: 'flex', // Flexbox layout
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center', // Horizontally center children
                justifyContent: 'center', // Vertically center children
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={'/images/icons/' + group.image}
                alt={group.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginBottom: '10px',
                }}
              />
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {group.name}
              </div>
            </button>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#555' }}>
            No groups available.
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import PostFeed from './PostFeed'

export default function Home() {
  const navigate = useNavigate()
  const isAuth = true

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  return (
    <main className="px-8 w-full md:px-0 md:w-8/12 lg:w-[38rem] mx-auto">
      <PostFeed />
    </main>
  )
}

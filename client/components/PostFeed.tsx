import { usePosts } from '../hooks/use-posts'
import PostBox from './PostBox'
import Spinner from './Spinner'

export default function PostFeed() {
  const { data: posts, isLoading, isError } = usePosts()

  if (isLoading) return <Spinner />
  if (isError || !posts) return <p>Error</p>

  return (
    <section aria-label="Post Feed" className="flex flex-col gap-24 py-24">
      {posts.map((post) => (
        <PostBox key={post.postId} post={post} />
      ))}
    </section>
  )
}

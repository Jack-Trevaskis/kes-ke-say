import { usePosts } from '../hooks/posthooks'
import PostBox from './PostBox'
import Spinner from './Spinner'

export default function PostFeed() {
  const { data: posts, isLoading, isError } = usePosts()

  if (isLoading)
    return (
      <p className="p-24 flex justify-center items-center">
        <Spinner />
      </p>
    )
  if (isError || !posts) return <p>Error</p>
  return (
    <section className="flex flex-col gap-24 py-24">
      {posts.map((post) => (
        <PostBox key={post.postId} post={post} />
      ))}
    </section>
  )
}

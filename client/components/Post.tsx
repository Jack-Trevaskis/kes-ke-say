import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePost, usePostDelete } from '../hooks/use-posts'
import Spinner from './Spinner'
import serialiseDate from '../utils/serialiseDate'
import ReactionBox from './RatingBox'
import { FormEvent } from 'react'
import { useAccount } from '../hooks/use-account'

export default function Post() {
  const { id } = useParams()
  const { data: account } = useAccount()
  const { data: post, isLoading, isError } = usePost(id || '')
  const { mutate: deletePost } = usePostDelete()
  const navigate = useNavigate()

  if (isLoading) return <Spinner />
  if (isError || !post) return <p>Error</p>

  const {
    userImage,
    userAccountName,
    userFullName,
    postBody,
    postImage,
    postCreatedAt,
  } = post

  const postVotes = {
    glasses: 12,
    cheese: 25,
    sunrise: 0,
    icon: 53,
  }

  const handleDelete = async () => {
    deletePost(String(post.postId))
    navigate('/')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <main className="py-24 w-[38rem] mx-auto">
      <Link
        aria-label="Profile Link"
        to={'/profiles/' + userAccountName}
        className="flex items-center gap-4 -translate-x-18"
      >
        <img
          src={`/images/avatars/${userImage}`}
          alt={userFullName}
          className="size-14 bg-blue-300 rounded-full"
        />
        <span className="font-semibold">
          <p className="text-sky-800">
            {`${userFullName} (${userAccountName})`}
          </p>
          <p className="text-sm text-slate-400">
            {serialiseDate(postCreatedAt)}
          </p>
        </span>
      </Link>
      <p className="mt-4">{postBody}</p>
      {postImage && (
        <img src={postImage} alt="" className="mt-2 max-h-[38rem] rounded-md" />
      )}
      <span className="block mt-4">
        <ReactionBox votes={postVotes} />
      </span>
      {account?.username === post.userAccountName && (
        <button
          onClick={handleDelete}
          className="mt-4 text-sm font-semibold text-red-600"
        >
          Delete
        </button>
      )}
      <form action="POST" onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment"
          className="mt-16 w-full h-40 border-stone-300 border-2 rounded-md p-2 resize-none"
          maxLength={200}
          placeholder="Post your comment"
        ></textarea>
        <input
          type="submit"
          value="Reply"
          className="mt-1 text-white bg-blue-700 px-10 py-3 text-sm font-semibold rounded-md hover:bg-blue-600 hover:cursor-pointer active:bg-blue-800"
        />
      </form>
    </main>
  )
}

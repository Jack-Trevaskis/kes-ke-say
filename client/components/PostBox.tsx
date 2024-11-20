import { Link } from 'react-router-dom'
import { PostResponse } from '../../models/post'
import serialiseDate from '../utils/serialiseDate'
import { usePost } from '../hooks/posthooks'

interface Props {
  post: PostResponse
}

export default function PostBox({ post }: Props) {
  const postHook = usePost(String(post.postId))

  if (postHook.isLoading) return <p>none</p>
  if (postHook.isError) return <p>none</p>

  const {
    userImage,
    userAccountName,
    userFullName,
    postId,
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

  const handleDelete = () => {
    postHook.delete.mutate(String(postId))
  }

  return (
    <div className="flex gap-8 text-sky-800">
      <div className="flex-1">
        <Link
          to={'/profiles/' + userAccountName}
          className="flex items-center gap-4 hover:underline font-semibold"
        >
          <img
            data-testid="post-user-avatar"
            src={`/images/avatars/${userImage}`}
            alt=""
            className="size-8 bg-blue-300 rounded-full"
          />
          <p data-testid="post-user-name">
            {userFullName} ({userAccountName})
          </p>
        </Link>
        <p data-testid="post-body" className="mt-4">
          {postBody}
        </p>
        {postImage && <img src={postImage} alt="" className="mt-2 max-h-96" />}

        <span className="mt-6 text-xs flex items-center gap-2">
          <p className="relative top-[2px] text-slate-400">
            {serialiseDate(postCreatedAt)}
          </p>
        </span>

        <span className="mt-1 text-sm flex items-center gap-2">
          <Link className="hover:underline" to={'/post/' + postId}>
            Open
          </Link>
          <button onClick={handleDelete} className="hover:underline">
            Delete
          </button>
          <ReactionBox votes={postVotes} />
        </span>
      </div>
    </div>
  )
}

interface Votes {
  glasses: number
  cheese: number
  sunrise: number
  icon: number
}

function ReactionBox({ votes }: { votes: Votes }) {
  const serialiseVotes = (votes: Votes) => {
    const glasses = votes.glasses
    const cheese = votes.cheese
    const sunrise = votes.sunrise
    const icon = votes.icon

    return { glasses, cheese, sunrise, icon }
  }

  const { glasses, cheese, sunrise, icon } = serialiseVotes(votes)

  return (
    <div className="flex gap-4 ml-auto text-slate-400">
      <button className="relative flex justify-center items-center">
        <img
          src="/images/icons/glasses-darkgray.png"
          alt=""
          className="size-6"
        />
        <p className="relative top-[2px] ml-1 text-xs">{glasses}</p>
      </button>
      <button className="relative flex justify-center items-center">
        <img
          src="/images/icons/cheese-darkgray.png"
          alt=""
          className="size-6"
        />
        <p className="relative top-[2px] ml-1 text-xs">{cheese}</p>
      </button>
      <button className="relative flex justify-center items-center">
        <img
          src="/images/icons/sunrise-darkgray.png"
          alt=""
          className="size-6"
        />
        <p className="relative top-[2px] ml-1 text-xs">{sunrise}</p>
      </button>
      <button className="relative flex justify-center items-center">
        <img src="/images/icons/icon-darkgray.png" alt="" className="size-6" />
        <p className="relative top-[2px] ml-1 text-xs">{icon}</p>
      </button>
    </div>
  )
}

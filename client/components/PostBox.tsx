import { Link } from 'react-router-dom'
import { PostResponse } from '../../models/post'
import serialiseDate from '../utils/serialiseDate'
import ReactionBox from './RatingBox'

interface Props {
  post: PostResponse
}

export default function PostBox({ post }: Props) {
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

  return (
    <div className="text-sky-900">
      <Link
        aria-label="Profile Link"
        to={'/profiles/' + userAccountName}
        className="hover:underline flex items-center gap-4 font-semibold"
      >
        <img
          src={`/images/avatars/${userImage}`}
          alt={userFullName}
          className="size-8 bg-blue-300 rounded-full"
        />
        <p className="text-sky-800">{`${userFullName} (${userAccountName})`}</p>
      </Link>
      <p className="mt-4">{postBody}</p>
      {postImage && (
        <img src={postImage} alt="" className="mt-2 max-h-[38rem] rounded-md" />
      )}
      <span className="mt-6 text-sm flex items-end gap-2 text-slate-500">
        {serialiseDate(postCreatedAt)}
        <ReactionBox votes={postVotes} />
      </span>
      <Link to={'/post/' + postId} className="hover:underline font-semibold">
        Open
      </Link>
    </div>
  )
}

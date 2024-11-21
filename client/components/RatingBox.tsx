interface Votes {
  glasses: number
  cheese: number
  sunrise: number
  icon: number
}

export default function ReactionBox({ votes }: { votes: Votes }) {
  const serialiseVotes = (votes: Votes) => {
    const glasses = votes.glasses
    const cheese = votes.cheese
    const sunrise = votes.sunrise
    const icon = votes.icon

    return { glasses, cheese, sunrise, icon }
  }

  const { glasses, cheese, sunrise, icon } = serialiseVotes(votes)

  return (
    <div className="flex gap-4 ml-auto text-slate-500">
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

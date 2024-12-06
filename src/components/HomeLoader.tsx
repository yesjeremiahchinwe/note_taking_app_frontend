import loaderGif from "/images/loader.gif"

const HomeLoader = () => {
  return (
    <section className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center z-10">
            <img src={loaderGif} alt="Loading state Gif"/>
            <p className="italic text-base">Please wait...</p>
        </div>
    </section>
  )
}

export default HomeLoader
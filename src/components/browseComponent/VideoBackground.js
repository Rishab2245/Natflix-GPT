import useMovieTrailer from '../../utils/hooks/useMovieTrailer';
import { useSelector } from "react-redux";

const VideoBackground = ({ id }) => {
    useMovieTrailer(id);
    const trailerObj = useSelector(store => store.movies.trailer);

    return (
        <div className='sm:pt-0 pt-1' >
            <iframe
                className="w-full h-full aspect-video  "
                src={
                    "https://www.youtube.com/embed/" +
                    trailerObj?.key +
                    "?&autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
        </div>
    )
}

export default VideoBackground;
import { ListGroup } from "react-bootstrap/esm";
import PropTypes from "prop-types";



const SongItem = ({ songName, itemKey, playList, setPlaylist, recommendations, setRecommendations }) => {
    console.log("songName", songName)
    const handleClick = (e) => {
        e.preventDefault();
        setPlaylist((prevList) => [...prevList, songName])
        setRecommendations(recommendations.filter((song) => song !== songName))
    };

    return (
        <ListGroup.Item key={itemKey} action onClick={(e) => handleClick(e)}>
            {songName}
        </ListGroup.Item>
    );
};

export default SongItem

SongItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    playList: PropTypes.array.isRequired,
    setRecommendations: PropTypes.func.isRequired,
    recommendations: PropTypes.array.isRequired,
    setPlaylist: PropTypes.func.isRequired,
};


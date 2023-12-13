import { ListGroup } from "react-bootstrap/esm";
import PropTypes from "prop-types";

const SongItem = ({
    songName,
    itemKey,
    setPlaylist,
    recommendations,
    setRecommendations,
    getRecommendation,
    extractTrackID,
    search,
}) => {
    const handleClick = async (e) => {
        e.preventDefault();
        setPlaylist((prevList) => [...prevList, songName]);
        setRecommendations(recommendations.filter((song) => song !== songName));
        const trackData = await search(songName, "track");
        const trackID = extractTrackID(trackData, "track");
        await getRecommendation(trackID, "track");
    };

    return (
        <ListGroup.Item key={itemKey} action onClick={(e) => handleClick(e)}>
            {songName}
        </ListGroup.Item>
    );
};

SongItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    playList: PropTypes.array.isRequired,
    setRecommendations: PropTypes.func.isRequired,
    recommendations: PropTypes.array.isRequired,
    getRecommendation: PropTypes.func.isRequired,
    extractTrackID: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    setPlaylist: PropTypes.func.isRequired,
};

export default SongItem;
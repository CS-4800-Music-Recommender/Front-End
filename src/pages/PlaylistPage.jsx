import {
  Container,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import logo from "../images/splashscreen/bpm-logo.png";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap/esm";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { initializeApp } from "firebase/app";
import SongItem from "../components/SongItem";

import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useRef } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyDjJXiSe8NLbQmIEQ1Jp0bJt0nvmpfsqgY",
  authDomain: "test-db-4c9b3.firebaseapp.com",
  projectId: "test-db-4c9b3",
  storageBucket: "test-db-4c9b3.appspot.com",
  messagingSenderId: "670488527506",
  appId: "1:670488527506:web:ac82e677dc91342701dc4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const PlaylistPage = () => {
  const [searchBox, setSearchBox] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const accessToken = useContext(UserContext).accessToken;
  const isMounted = useRef(false);
  const loadPlaylist = async (user) => {
    const colRef = collection(db, "users");

    const q = query(colRef, where("userEmail", "==", user.email));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setPlaylist(data.musicList);
      });
    });
  };
  const user = useContext(UserContext).user;

  useEffect(() => {
    if (isMounted.current) {
      if (user && playlist.length > 0) {
        const updateUserPlaylist = async (user, playlist) => {
          const docData = {
            userEmail: user.email,
            musicList: playlist,
          };
          try {
            await setDoc(doc(db, "users", user.email), docData);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        };
        updateUserPlaylist(user, playlist);
      }
    }
    isMounted.current = true;
  }, [playlist, user]);
  useEffect(() => {
    if (user) {
      loadPlaylist(user);
    }
  }, []);

  const exportPlaylist = async (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(JSON.stringify(playlist))
  };

  const importPlaylist = async (musicArray) => {
    const playlist = JSON.parse(musicArray);
    setPlaylist(playlist);
  }

  // inputtedText would be the name of the artist or song, type would be if it's an artist or a track. Allowed Types: "album", "artist", "playlist", "track", "show", "episode", "audiobook"
  // Here the type will either be "artist" or "track"
  async function search(inputtedText, type) {
    let songParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${inputtedText}&type=${type}&limit=1`,
      songParams
    );
    const data = await response.json();
    return data;
  }

  const handleInputChange = (event) => {
    setSearchBox(event.target.value);
  };

  const extractTrackID = (data, type) => {
    if (type === "track") {
      return data.tracks.items[0].id;
    } else if (type === "artist") {
      return data.artists.items[0].id;
    }
  };

  // textID is either going to be the name of the artist or the name of the track.
  // Type is going to either be for searching artist or track. The type will either be "artists" or "tracks"
  const getRecommendation = async (textID, type) => {
    const typeWithS = type + "s";
    let recommendationParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=2&seed_${typeWithS}=${textID}`,
      recommendationParams
    );
    const data = await response.json();
    data.tracks.forEach((track) => {
      const recName = `${track.name} - ${track.artists[0].name}`;
      setRecommendations((prevList) => [...prevList, recName]);
    });
  };

  const handleSubmit = async (event, type) => {
    event.preventDefault();
    if (type === "track") {
      setPlaylist((prevList) => [...prevList, searchBox]);
    }
    const trackData = await search(searchBox, type);
    const trackID = extractTrackID(trackData, type);
    await getRecommendation(trackID, type);
    setSearchBox("");
  };

  const clearPlaylist = async (event) => {
    event.preventDefault();
    setPlaylist([]);
    setRecommendations([]);
    const docData = {
      userEmail: user.email,
      musicList: [],
    };
    try {
      await setDoc(doc(db, "users", user.email), docData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Import playlist alert box*****************************************
  const importAlert = () => {
    // Create import alert overlay
    const importOverlay = document.createElement("div");
    importOverlay.style.position = "fixed";
    importOverlay.style.top = "0";
    importOverlay.style.left = "0";
    importOverlay.style.width = "100%";
    importOverlay.style.height = "100%";
    importOverlay.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
    importOverlay.style.zIndex = "2000"; // Z-index should be higher than the customAlert overlay
    document.body.appendChild(importOverlay);

    // Create import alert container
    const importAlertDiv = document.createElement("div");
    importAlertDiv.style.position = "fixed";
    importAlertDiv.style.zIndex = "2001"; // Higher z-index than the customAlert container
    importAlertDiv.style.left = "50%";
    importAlertDiv.style.top = "50%";
    importAlertDiv.style.transform = "translate(-50%, -50%)";
    importAlertDiv.style.backgroundColor = "#484848"; // Background color of the import alert container
    importAlertDiv.style.padding = "20px";
    importAlertDiv.style.borderRadius = "45px";
    importAlertDiv.style.border = "5px solid #393939"; // Border around the import alert container
    importAlertDiv.style.display = "flex";
    importAlertDiv.style.flexDirection = "column";
    importAlertDiv.style.alignItems = "center"; // Center the content horizontally
    importAlertDiv.style.justifyContent = "center"; // Center the content vertically

    // Create input box
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.placeholder = "Enter playlist array";
    inputBox.style.width = "100%"; // Make the input box wider
    inputBox.style.paddingLeft = "10px"; // Add padding to the left
    inputBox.style.marginBottom = "10px";
    inputBox.style.borderRadius = "45px";

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.marginTop = "10px";

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.padding = "10px";
    submitButton.style.cursor = "pointer";
    submitButton.style.backgroundColor = "#72B550";
    submitButton.style.color = "#000";
    submitButton.style.borderRadius = "45px";
    submitButton.style.border = "5px solid #393939";
    submitButton.style.width = "100px"; // Set a fixed width
    submitButton.style.fontSize = "18px"; // Set the font size
    submitButton.style.fontWeight = "bold"; // Make the font bold

    // Add click event to submit button
    submitButton.onclick = async () => {
      // Handle the submission logic here
      const inputValue = inputBox.value;
      // You can add logic to handle the input value, e.g., make an API call
      await importPlaylist(inputValue);

      // Close the import alert
      document.body.removeChild(importAlertDiv);
      document.body.removeChild(importOverlay);
    };

    // Create cancel button -----------------------------------------------------
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.padding = "10px";
    cancelButton.style.cursor = "pointer";
    cancelButton.style.backgroundColor = "#E04F5F";
    cancelButton.style.color = "#000";
    cancelButton.style.borderRadius = "45px";
    cancelButton.style.border = "5px solid #393939";
    cancelButton.style.width = "100px"; // Set a fixed width
    cancelButton.style.fontSize = "18px"; // Set the font size
    cancelButton.style.fontWeight = "bold"; // Make the font bold

    // Add click event to cancel button
    cancelButton.onclick = () => {
      // Handle the cancel logic here
      console.log("Cancel button clicked");

      // Close the import alert
      document.body.removeChild(importAlertDiv);
      document.body.removeChild(importOverlay);
    };

    // Append input box to the import alert container
    importAlertDiv.appendChild(inputBox);

    // Append submit and cancel buttons to the button container
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    // Append the button container to the import alert container
    importAlertDiv.appendChild(buttonContainer);

    // Append the import alert container to the body
    document.body.appendChild(importAlertDiv);
  };

  // Create Playlist Alert*********************************************

  return (
    <>
      {/* First container holding hamburger menu and Logo */}
      <Row>
        <Container fluid className="p-5 text-center">
          <Row>
            <Col className="text-center">
              <Link to="/">
                <Image src={logo} width={300} fluid />
              </Link>
            </Col>
          </Row>
        </Container>
      </Row>

      {/* Start of 3 columns of containers for buttons and two lists */}
      <Row>
        <Col>
          <Container fluid className="text-center">
            {/* Buttons and search column */}
            <Col md={{ span: 8, offset: 2 }}>
              <div className="text-center">
                {/* Export playlist Button */}

                <Row>
                  <Button
                    style={{
                      fontWeight: "bold",
                      borderRadius: "45px",
                      backgroundColor: "#72B550",
                      color: "#000",
                      borderWidth: "5px",
                      borderColor: "#000",
                      marginRight: "128px",
                    }}
                    size="lg"
                    className="my-3 p-3 fs-5"
                    onClick={exportPlaylist}
                  >
                    Export Playlist
                  </Button>
                </Row>
                {/* Import Playlist button */}
                <Row>
                  <Button
                    style={{
                      fontWeight: "bold",
                      borderRadius: "45px",
                      backgroundColor: "#72B550",
                      color: "#000",
                      borderWidth: "5px",
                      borderColor: "#000",
                      marginRight: "128px",
                    }}
                    size="lg"
                    onClick={importAlert}
                    className="my-3 p-3 fs-5"
                  >
                    Import Playlist
                  </Button>
                </Row>

                {/* Create Playlist button */}
                <Row>
                  <Button
                    style={{
                      fontWeight: "bold",
                      borderRadius: "45px",
                      backgroundColor: "#72B550",
                      color: "#000",
                      borderWidth: "5px",
                      borderColor: "#000",
                      marginRight: "128px",
                    }}
                    size="lg"
                    onClick={clearPlaylist}
                    className="my-3 p-3 fs-5"
                  >
                    Delete Playlist
                  </Button>
                </Row>

                {/* Search Bar */}
                <Row>
                  <InputGroup className="mb-3, my-3">
                    <Form.Control
                      placeholder="Search Song or Artist"
                      aria-label="Search Song or Artist"
                      aria-describedby="basic-addon2"
                      value={searchBox}
                      onChange={handleInputChange}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={(event) => handleSubmit(event, "artist")}
                    >
                      Artist
                    </Button>
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={(event) => handleSubmit(event, "track")}
                    >
                      Song
                    </Button>
                  </InputGroup>
                </Row>
              </div>
            </Col>
          </Container>
        </Col>

        {/* Column for Recommended songs list */}
        <Col>
          <div
            style={{
              backgroundColor: "#79ccd9",
              border: "5px solid #000",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          >
            <Container fluid className="text-center ">
              <div className="text-center ">
                <h2>
                  <b>Recommended</b>
                </h2>
                <div className="text-center">
                  <ListGroup className="fs-5 overflow-auto">
                    {recommendations.map((song, key) => (
                      <SongItem
                        extractTrackID={extractTrackID}
                        search={search}
                        getRecommendation={getRecommendation}
                        key={key}
                        songName={song}
                        setPlaylist={setPlaylist}
                        recommendations={recommendations}
                        setRecommendations={setRecommendations}
                      />
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Container>
          </div>
        </Col>

        {/* Column for Current Playlist */}
        <Col>
          <div
            style={{
              backgroundColor: "#000",
              border: "5px solid #72B550",
              borderRadius: "5px",
              height: "100%",
              width: "80%",
            }}
          >
            <Container fluid className="text-center ">
              <div className="text-center ">
                <h2 style={{ fontWeight: "bold", color: "#72B550" }}>
                  Current Playlist
                </h2>
              </div>
              <div className="text-center">
                <ListGroup className="fs-5">
                  {playlist.map((song, key) => (
                    <ListGroup.Item key={key} action>
                      {song}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Container>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PlaylistPage;

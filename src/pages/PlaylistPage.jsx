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
import { List } from "react-bootstrap-icons";
import { ListGroup } from "react-bootstrap/esm";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { initializeApp } from "firebase/app";

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

// const firebaseConfig = {
//   apiKey: "AIzaSyBTUuFCEWK78XM31h-bqOVw-DfEiGy74as",
//   authDomain: "cs-4800.firebaseapp.com",
//   projectId: "cs-4800",
//   storageBucket: "cs-4800.appspot.com",
//   messagingSenderId: "255169053476",
//   appId: "1:255169053476:web:de84c4f972abf63cea69b1",
// };
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
    console.log("Loaded playlist");

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
            // console.log(playlist)
            await setDoc(doc(db, "users", user.email), docData);
            // console.log("Document written with ID: ", docRef.id);
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
      setRecommendations((prevList) => [...prevList, track.name]);
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
      // console.log(playlist)
      await setDoc(doc(db, "users", user.email), docData);
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //Hambuger menu alert box************************************************
  const customAlert = () => {
    // Array of items to list
    const itemList = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
      "Item 9",
      "Item 10",
    ];

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
    overlay.style.zIndex = "1000"; // Z-index should be lower than the alert container
    document.body.appendChild(overlay);

    // Create alert container
    const alertDiv = document.createElement("div");
    alertDiv.style.position = "fixed";
    alertDiv.style.zIndex = "1001"; // Higher z-index than the overlay
    alertDiv.style.left = "50px"; // Margin from the left side
    alertDiv.style.top = "50px"; // Margin from the top
    alertDiv.style.width = "300px"; // Set alert window size to 300px
    alertDiv.style.backgroundColor = "#484848"; // Background color of the alert container
    alertDiv.style.padding = "20px";
    alertDiv.style.border = "2px solid #000"; // Border around the alert container
    alertDiv.style.border = "5px solid #393939"; // Border around the import alert container
    alertDiv.style.display = "flex";
    alertDiv.style.flexDirection = "column";
    alertDiv.style.alignItems = "center"; // Center the content horizontally
    alertDiv.style.justifyContent = "center"; // Center the content vertically

    // Create header
    const header = document.createElement("h2");
    header.textContent = "Saved Playlists";
    header.style.textAlign = "center";
    header.style.color = "#FFF"; // Set header text color
    header.style.marginBottom = "20px";
    header.style.fontWeight = "bold"; // Make the font bold

    // Create close button (X)
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;"; // "x" character for the close button
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.fontSize = "20px";
    closeButton.style.cursor = "pointer";

    // Add click event to close the alert
    closeButton.onclick = () => {
      document.body.removeChild(alertDiv);
      document.body.removeChild(overlay);
    };

    // Append the close button and header to the alert container
    alertDiv.appendChild(closeButton);
    alertDiv.appendChild(header);

    // Create item list
    const listContainer = document.createElement("ul");
    listContainer.style.listStyleType = "none";
    listContainer.style.padding = "0";

    // Populate the item list
    for (let i = 0; i < itemList.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = itemList[i];
      listItem.style.marginBottom = "10px";
      listItem.style.color = "#fff"; // Set text color
      listItem.style.fontSize = "16px"; // Set font size
      listItem.style.fontWeight = "bold"; // Make the font bold
      listContainer.appendChild(listItem);
    }

    // Create logout button
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.style.padding = "10px";
    logoutButton.style.cursor = "pointer";
    logoutButton.style.backgroundColor = "#E04F5F";
    logoutButton.style.color = "#000";
    logoutButton.style.borderRadius = "1px";
    logoutButton.style.border = "5px solid #000";
    logoutButton.style.width = "100%"; // Span the width of the alert container
    logoutButton.style.marginTop = "20px";
    logoutButton.style.fontSize = "18px"; // Set the font size
    logoutButton.style.fontWeight = "bold"; // Make the font bold

    // Add click event to logout button
    logoutButton.onclick = () => {
      // Handle logout logic here
      console.log("Logout button clicked");

      // Close the alert
      document.body.removeChild(alertDiv);
      document.body.removeChild(overlay);
    };

    // Append the item list and logout button to the alert container
    alertDiv.appendChild(listContainer);
    alertDiv.appendChild(logoutButton);

    // Append the alert container to the body
    document.body.appendChild(alertDiv);
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
    inputBox.placeholder = "Enter playlist URL";
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
    submitButton.onclick = () => {
      // Handle the submission logic here
      const inputValue = inputBox.value;
      // You can add logic to handle the input value, e.g., make an API call
      console.log("Submitted value:", inputValue);

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
  const createAlert = () => {
    // Create create alert overlay
    const createOverlay = document.createElement("div");
    createOverlay.style.position = "fixed";
    createOverlay.style.top = "0";
    createOverlay.style.left = "0";
    createOverlay.style.width = "100%";
    createOverlay.style.height = "100%";
    createOverlay.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
    createOverlay.style.zIndex = "2000"; // Z-index should be higher than the customAlert overlay
    document.body.appendChild(createOverlay);

    // Create create alert container
    const createAlertDiv = document.createElement("div");
    createAlertDiv.style.position = "fixed";
    createAlertDiv.style.zIndex = "2001"; // Higher z-index than the customAlert container
    createAlertDiv.style.left = "50%";
    createAlertDiv.style.top = "50%";
    createAlertDiv.style.transform = "translate(-50%, -50%)";
    createAlertDiv.style.backgroundColor = "#484848"; // Background color of the create alert container
    createAlertDiv.style.padding = "20px";
    createAlertDiv.style.borderRadius = "45px";
    createAlertDiv.style.border = "5px solid #393939"; // Border around the create alert container
    createAlertDiv.style.display = "flex";
    createAlertDiv.style.flexDirection = "column";
    createAlertDiv.style.alignItems = "center"; // Center the content horizontally
    createAlertDiv.style.justifyContent = "center"; // Center the content vertically

    // Create message
    const message = document.createElement("p");
    message.innerHTML =
      "If you create a new playlist<br> you will lose any unsaved<br> changes to your current<br> playlist. Continue?";
    message.style.marginBottom = "20px";
    message.style.color = "#fff"; // Set text color to white
    message.style.textAlign = "center"; // Center the text
    message.style.fontSize = "18px"; // Set the font size
    message.style.fontWeight = "bold"; // Make the font bold

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between"; // Add space between buttons
    buttonContainer.style.width = "100%"; // Occupy the full width

    // Create Ok button
    const okButton = document.createElement("button");
    okButton.textContent = "Ok";
    okButton.style.padding = "10px";
    okButton.style.cursor = "pointer";
    okButton.style.backgroundColor = "#72B550";
    okButton.style.color = "#000";
    okButton.style.borderRadius = "45px";
    okButton.style.border = "5px solid #393939";
    okButton.style.width = "100px"; // Set a fixed width
    okButton.style.fontSize = "18px"; // Set the font size
    okButton.style.fontWeight = "bold"; // Make the font bold

    // Add click event to Ok button
    okButton.onclick = () => {
      // Handle the Ok button logic here
      console.log("Ok button clicked");

      // Redirect to the /playlist page
      window.location.href = "/playlist";

      // Close the create alert
      document.body.removeChild(createAlertDiv);
      document.body.removeChild(createOverlay);
    };

    // Create Cancel button
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

    // Add click event to Cancel button
    cancelButton.onclick = () => {
      // Handle the Cancel button logic here
      console.log("Cancel button clicked");

      // Close the create alert
      document.body.removeChild(createAlertDiv);
      document.body.removeChild(createOverlay);
    };

    // Append Ok and Cancel buttons to the button container
    buttonContainer.appendChild(okButton);
    buttonContainer.appendChild(cancelButton);

    // Append message, button container, and Cancel button to the create alert container
    createAlertDiv.appendChild(message);
    createAlertDiv.appendChild(buttonContainer);

    // Append the create alert container to the body
    document.body.appendChild(createAlertDiv);
  };

  return (
    <>
      {/* First container holding hamburger menu and Logo */}
      <Row>
        <Container fluid className="p-5 text-center">
          <Row>
            <Col
              xs={12}
              md={{ span: 1, offset: 0 }}
              className="text-left"
              style={{ cursor: "pointer" }}
            >
              <List size={70} onClick={customAlert} />
            </Col>
            <Col></Col>
            <Col md={{ span: 4, offset: 3 }} className="text-center">
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
                  >
                    Save Playlist
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
                      <ListGroup.Item key={key} action>
                        {song}
                      </ListGroup.Item>
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

import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs, onSnapshot} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTUuFCEWK78XM31h-bqOVw-DfEiGy74as",
  authDomain: "cs-4800.firebaseapp.com",
  projectId: "cs-4800",
  storageBucket: "cs-4800.appspot.com",
  messagingSenderId: "255169053476",
  appId: "1:255169053476:web:de84c4f972abf63cea69b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const testAdd = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userNick: user.nickname
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}

const testGet = async () => {
  const colRef = collection(db, "users");

  const q = query(colRef, where("userNick", "==", "felawab110"));

 onSnapshot(q, (querySnapshot) => {
   querySnapshot.forEach((doc) => {
     console.log(doc.id, "=>", doc.data());
   });
 })



}

const Test = () => {
  const user = useContext(UserContext);
  return (
    <Container fluid className="p-5 text-center">
      <Col>
        <Row>
          <h1 className="text-center fs-2 my-5">
            This is a test screen that serves as a placeholder for any page not
            completed yet
          </h1>
        </Row>
      </Col>
      {user && (
        <Col>
          <p className="fs-1">Current user: {user.nickname}</p>
        </Col>
      )}
      <Col>
        <Button
          variant="outline-success"
          size="lg"
          as={Link}
          to="/"
          className="my-3 w-50 p-3 fs-1"
        >
          Back to splashscreen/main page
        </Button>
      </Col>
      <Col>
        <Button
          variant="outline-success"
          size="lg"
          className="my-3 w-50 p-3 fs-1"
          onClick={() => testAdd(user)}
        >
          test add to db
        </Button>
      </Col>
      <Col>
        <Button
          variant="outline-success"
          size="lg"
          className="my-3 w-50 p-3 fs-1"
          onClick={() => testGet()}
        >
          test check id
        </Button>
      </Col>
    </Container>
  );
};

export default Test;

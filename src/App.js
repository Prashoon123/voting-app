import { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";

function App() {
  const voted = localStorage.getItem("voted") || false;
  const [cricketVotes, setCricketVotes] = useState([]);
  const [footballVotes, setFootballVotes] = useState([]);
  let totalVotes = cricketVotes.length + footballVotes.length;
  let percentOfCricketVotes = (cricketVotes.length / totalVotes) * 100 || 0;
  let percentOfFootballVotes = (footballVotes.length / totalVotes) * 100 || 0;

  useEffect(() => {
    db.collection("cricketVotes").onSnapshot((snapshot) =>
      setCricketVotes(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  useEffect(() => {
    db.collection("footballVotes").onSnapshot((snapshot) =>
      setFootballVotes(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  const voteForCricket = () => {
    db.collection("cricketVotes").add({
      votedFor: "cricket",
    });
    localStorage.setItem("voted", true);
  };

  const voteForFootball = () => {
    db.collection("footballVotes").add({
      votedFor: "football",
    });
    localStorage.setItem("voted", true);
  };

  return (
    // BEM naming convention
    <div className="app">
      {voted ? (
        <div>
          <center>
            <h1>You have already voted.</h1>
            <div className="cricketVotes">
              {cricketVotes?.length > 1 ? (
                <h1>Votes for Cricket: {cricketVotes?.length} votes</h1>
              ) : (
                <h1>Votes for Cricket: {cricketVotes?.length} vote</h1>
              )}
              <h1>
                <label htmlFor="progressCricketVotes">
                  {percentOfCricketVotes && Math.round(percentOfCricketVotes)}%
                </label>
                <progress
                  id="progressCricketVotes"
                  value={percentOfCricketVotes && percentOfCricketVotes}
                  max="100"
                ></progress>
              </h1>
            </div>
            <div className="footballVotes">
              {footballVotes?.length > 1 ? (
                <h1>Votes for Football: {footballVotes?.length} votes</h1>
              ) : (
                <h1>Votes for Football: {footballVotes?.length} vote</h1>
              )}
              <h1>
                <label htmlFor="progressFootballVotes">
                  {percentOfFootballVotes && Math.round(percentOfFootballVotes)}
                  %
                </label>
                <progress
                  id="progressFootballVotes"
                  value={percentOfFootballVotes && percentOfFootballVotes}
                  max="100"
                ></progress>
              </h1>
            </div>
            <h1>Total Votes: {totalVotes}</h1>
          </center>
        </div>
      ) : (
        <>
          <div className="app__cricket">
            {cricketVotes?.length > 1 ? (
              <h1>{cricketVotes?.length} votes</h1>
            ) : (
              <h1>{cricketVotes?.length} vote</h1>
            )}
            <button onClick={voteForCricket}>Vote for Cricket</button>
          </div>
          <div
            style={{ height: "120px", width: "5px", backgroundColor: "black" }}
          ></div>
          <div className="app__football">
            {footballVotes?.length > 1 ? (
              <h1>{footballVotes?.length} votes</h1>
            ) : (
              <h1>{footballVotes?.length} vote</h1>
            )}
            <button onClick={voteForFootball}>Vote for Football</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

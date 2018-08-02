import PropTypes from "prop-types";
import React from "react";
import { Table, Container } from "reactstrap";

const sortHallOfFame = (a, b) => {
  let x = a.score;
  let y = b.score;
  if (x > y) return -1;
  if (x < y) return 1;
};

const HallOfFame = ({ entries, hideNav }) => (
  <div className="mr-3">
    <Table size={hideNav ? "sm" : "lg"}>
      <thead>
        {entries.sort(sortHallOfFame).map(({ date, score, id, player }) => (
          <tr key={id}>
            <td>{player}</td>
            <td>{score}</td>
            <td>{date}</td>
          </tr>
        ))}
      </thead>
    </Table>
  </div>
);

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      player: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HallOfFame;

// == Internal helpers ==============================================

const HOF_KEY = "::Memory::HallofFame";
// const HOF_MAX_SIZE = 10;

export function saveHOFEntry(entry, onStored, HOF_MAX_SIZE) {
  entry.date = new Date().toLocaleDateString();
  entry.id = Date.now();

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || "[]");
  const insertionPoint = entries.findIndex(({ score }) => score >= entry.score);

  if (insertionPoint === -1) {
    entries.push(entry);
  } else {
    entries.splice(insertionPoint, 0, entry);
  }
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length);
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries));
  onStored(entries);
}

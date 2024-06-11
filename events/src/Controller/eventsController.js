const fs = require("fs");
const path = require("path");
const { validationResult, matchedData } = require("express-validator");

let events = [];

// Read events from JSON file when the application starts
fs.readFile(
  path.join(__dirname, "..", "constants", "events.json"),
  "utf8",
  (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading file:", err);
    } else if (data) {
      try {
        events = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }
);

const postEvent = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const { name, occupation } = data;
  const nextId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
  const newEvent = {
    id: nextId,
    name,
    occupation,
  };
  events.push(newEvent);

  fs.writeFile(
    path.join(__dirname, "..", "constants", "events.json"),
    JSON.stringify(events),
    (err) => {
      if (err) {
        return res.status(500).send({ Message: "Error writing file" });
      }
      res.status(201).send(newEvent);
    }
  );
};

const putEvent = (req, res) => {
  const { findUserIndex } = req;
  const { body } = req;
  const parsedId = parseInt(req.params.id);
  events[findUserIndex] = { id: parsedId, ...body };

  fs.writeFile(
    path.join(__dirname, "..", "constants", "events.json"),
    JSON.stringify(events),
    (err) => {
      if (err) {
        return res.status(500).send({ Message: "Error writing file" });
      }
      res.sendStatus(200);
    }
  );
};

const patchEvent = (req, res) => {
  const { findUserIndex } = req;
  const { body } = req;
  events[findUserIndex] = { ...events[findUserIndex], ...body };

  fs.writeFile(
    path.join(__dirname, "..", "constants", "events.json"),
    JSON.stringify(events),
    (err) => {
      if (err) {
        return res.status(500).send({ Message: "Error writing file" });
      }
      console.log("User updated");
      return res.sendStatus(200);
    }
  );
};

const deleteEvent = (req, res) => {
  const { findUserIndex } = req;
  events.splice(findUserIndex, 1);

  fs.writeFile(
    path.join(__dirname, "..", "constants", "events.json"),
    JSON.stringify(events),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send({ Message: "Error writing file" });
      }
      console.log("Event deleted");
      res.sendStatus(200);
    }
  );
};

const getEvents = (req, res) => {
  res.send(events);
};

module.exports = { postEvent, putEvent, patchEvent, deleteEvent, getEvents };

const express = require("express");
const eventsRouter = require('./Routes/eventsRouter.js')
const app = express();

app.use(express.json());
app.use(eventsRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

// module.exports = router; 
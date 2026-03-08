// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();

const PORT = 4001;
app.use(cors({
     origin: '*'
}));

const emailRouter = require("./email");

app.use(bodyParser.json({ limit: '3mb' })); // avoid large body
app.use("/email", emailRouter);

const writeData = (data, type) => {
  try {
    const dir = path.join(__dirname, type);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const fileName = path.join(dir, `userData_${Date.now()}.json`);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('writeData error:', e);
  }
};

app.post('/api/response', (req, res) => {
  const { data, type } = req.body;
  writeData(data, type);
  res.json({ message: 'Data received successfully.' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
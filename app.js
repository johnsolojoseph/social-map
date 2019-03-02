const express = require('express');
const app = express();

//Port for localhost or production
const port = 8000 || process.env.PORT;

//Serve user static files
app.use(express.static(__dirname));

app.listen(port, () => console.log(`The magic is happening on port ${port}!`));

const express = require('express');
const { getLatestNews } = require('./controller/latestNewsController');
const app = express();


const PORT =  3000;


// Define route for /getTimeStories endpoint
app.get('/getTimeStories', getLatestNews); 



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


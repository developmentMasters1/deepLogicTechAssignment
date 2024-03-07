
const { fetchHTML, extractLatestStories } = require('../services/parseHtml');


const getLatestNews = async (req, res) => {
    try {
        const html = await fetchHTML();
        const latestStories = extractLatestStories(html);
        // console.log('latestStories:', latestStories );

        res.json(latestStories);
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {getLatestNews} ; 





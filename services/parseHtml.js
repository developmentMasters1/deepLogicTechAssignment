const {parse } = require('node-html-parser');
const  https = require('https'); 

const baseUrl = 'https://time.com'; 


// Function to fetch HTML content from Time.com
async function fetchHTML() {
    return new Promise((resolve, reject) => {
        https.get(baseUrl, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}






// // Function to extract latest stories using regular expressions
// function extractLatestStories(html) {
//     const regex = /<a href="([^"]+)">([^<]+)<\/a>/g;
//     const latestStories = [];
//     const ulRegex = /<ul class="latest-stories__list">([\s\S]*?)<\/ul>/;
//     const ulMatch = ulRegex.exec(html);

//     if (ulMatch) {
//         const ulContent = ulMatch[1];
//         let match;

//         while ((match = regex.exec(ulContent)) !== null && latestStories.length < 6) {
//             const link = match[1];
//             const title = match[2].trim();
//             latestStories.push({ title, link });
//         }
//     }

//     return latestStories;
// }


function extractLatestStories(html) {   
    // console.log(html) ;  
    const root = parse(html);
    const storyElements = root.querySelectorAll('.latest-stories__item');
    const latestStories = [];

    for (const element of storyElements) {
        const titleElement = element.querySelector('h3');
        const linkElement = element.querySelector('a');

        if (titleElement && linkElement) {
            const title = titleElement.text.trim();
            const link = baseUrl + linkElement.getAttribute('href');

            latestStories.push({ title, link });
        }

        if (latestStories.length >= 6) {
            break; // Break loop once 6 stories are collected
        }
    }

    return latestStories;
}


module.exports = {fetchHTML, extractLatestStories} ; 
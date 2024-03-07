
const  https = require('https'); 

const baseUrl = 'https://time.com'; 


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

// get link data for each  story
function linkData(links) {
    let finalArray = [];
    links.forEach((element) => {
      let f = element.replace('href="', "");
      let s = f.replace('">', "");
      s =  baseUrl + s;
      finalArray.push(s);
    });
    return finalArray;
  }
  
// get title data for each story
  function storiesData(stories) {
    let finalArray = [];
    stories.forEach((element) => {
      let f = element.replace('line">', "");
      let s = f.replace("</h3>", "");
      let t = s.replace(/<(.*?)>/g, "");
      finalArray.push(t);
    });
    return finalArray;
  }
  

function extractLatestStories(html) {
    let processData = html.replace(/\n/g, "");
    processData = processData.replace(/[t ]+\</g, "<");
    processData = processData.replace(/\>[\t ]+\</g, "><");
    processData = processData.replace(/\>[\t ]+$/g, ">");
  
    let processDataobj = processData.match(/Latest Stories(.*?)<\/ul>/);
  
    processData = processDataobj[0];
    let links = processData.match(/href="(.*?)>/g);
    let stories = processData.match(/line">(.*?)h3>/g);
  
    const processedLink = linkData(links);
    const processTitle = storiesData(stories);
  
    let finalStoriesArray = [];
  
    for (i = 0; i < 6; i++) {
      let storyObject = {};
      storyObject["title"] = processTitle[i];
      storyObject["link"] = processedLink[i];
  
      finalStoriesArray.push(storyObject);
    }
    return finalStoriesArray;

}



module.exports = {fetchHTML, extractLatestStories} ; 
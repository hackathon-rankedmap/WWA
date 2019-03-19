const key = '7d54ecd011044b1eb1397aad147637b8';
const baseUrl = 'https://api.ozae.com';


function getPopularArticles(edition, hours, order = 'social_score', orderStr = 'DESC'){
  const url = `${baseUrl}/gnw/articles?key=${key}&edition=${edition}&hours=${hours}&options[newsonfire]=1&order[col]=${order}&order[srt]=${orderStr}`;
  return axios.get(url).then( (response) => { return Promise.resolve(response.data.articles) } )
}

function getPopularTopics(articles){
  const topics = {};
  articles.forEach( (article) => {
    if(topics[article['topics']['str']]){
      topics[article['topics']['str']] += 1;
    } else {
      topics[article['topics']['str']] = 1;
    }
  } );
  return Promise.resolve(topics);
}



/**
 *
 * @param query
 * @param date format : 20180601__20180630
 * @param edition
 * @param limit
 */
function searchByText(query, date, edition, limit = 20){
  const url = `${baseUrl}/gnw/articles?date=${date}&key=${key}&edition=${edition}&query=${query}&hard_limit=${limit}`;
  axios.get(url)
      .then( (response) => console.log(response.data) )
}

function getArticles(date = null, edition = null, topic = null, order = null, limit = null){
    let url = `${baseUrl}/gnw/articles`;
  if(edition){

  }
  axios.get(url)
      .then( (response) => console.log(response.data) )
}







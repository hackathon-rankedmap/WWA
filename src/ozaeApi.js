import axios from 'axios';

const key = '7d54ecd011044b1eb1397aad147637b8';
const baseUrl = 'https://api.ozae.com';


export function getPopularArticles(edition, hours, order = 'social_score', orderStr = 'DESC'){
  const url = `${baseUrl}/gnw/articles?key=${key}&edition=${edition}&hours=${hours}&options[newsonfire]=1&order[col]=${order}&order[srt]=${orderStr}`;
  return axios.get(url).then( (response) => { return Promise.resolve(response.data.articles) } )
}

export function getAllPopularArticles( hours, order = 'social_score', orderStr = 'DESC'){
  const allArticles = [];
  const locales = ['fr-fr', 'en-gb', 'fr-be', 'nl-be', 'de-de', 'en-us-ny', 'it-it', 'pt-br'];
  locales.forEach( (locale) => {
    allArticles.push(getPopularArticles(locale, hours, order, orderStr));
  });

  return Promise.all(allArticles);
}

export function getPopularTopics(articles){
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

export function searchByText(query, date, edition, limit = 20) {
  const url = `${baseUrl}/gnw/articles?date=${date}&key=${key}&edition=${edition}&query=${query}&hard_limit=${limit}`;
  axios.get(url)
      .then( (response) => {return Promise.resolve(response.data.articles)} )
}


export function getArticles(date = "", edition = "", topic = "", order = "", limit = 9){
  let url = `${baseUrl}/gnw/articles?key=${key}&edition=${edition}&date=${date}&topic=${topic}&order=${order}&hard_limit=${limit}`;
  return axios.get(url)
      .then( (response) => Promise.resolve(response.data.articles) )
}

export function getTotalScores(articles){
  let score = 0;
  articles.forEach((article) => {
    score += article['article_score'];
  });
  return Promise.resolve(score);
}







const getNews = (api_key,source = 'allNews', search = '') => {

  switch (source) {
    case 'nyt':
      return getNYT(api_key.nyt)
      break
    case 'guardian':
      return getGuardian(api_key.guardian)
      break
    default:
      return getNewsAPI(api_key.news, search)
  }

}

const getNYT = async (api_key) => {
  const path = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${api_key}`
  try {
    const res = await fetch(path)
    const json = await res.json()
    console.log(json)
    const formattedData = json.results.map((article) => {
      const data = {
        snippet: article.abstract, 
        title: article.title, 
        url: article.url,
      }
      if (article.media.length > 0) {
        console.log('hello')
        if ('media-metadata' in article.media[0] && article.media[0]['media-metadata'].length > 0) {
          console.log('hello2')
          data.image_url = article.media[0]['media-metadata'][article.media[0]['media-metadata'].length-1].url
        }
      }
      return data
    })
    console.log(formattedData)
    return formattedData
  } catch(err) {
    console.log('error', err)
  }
}

const getNewsAPI = async (api_key, search = '') => {

  var requestOptions = {
    method: 'GET'
  };

  const date = new Date()
  
  var params = {
    api_token: api_key,
    locale: 'ca',
    language: 'en',
  };
  
  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map(function(k) {return esc(k) + '=' + esc(params[k]);})
    .join('&');

  let path = "https://api.thenewsapi.com/v1/news/top?" + query
  if (search !== '') {
    path = `${path}&search=${search}`
  }

  try {
    const res = await fetch(path, requestOptions)
    const data = await res.json()
    console.log(data.data)
    return data.data

  } catch(error) {
    console.log('error', err)
  }
}

const getGuardian = async (api_key) => {
  const path = `https://content.guardianapis.com/search?api-key=${api_key}&show-elements=image&show-fields=thumbnail`
  console.log(path)
  try {
    const res = await fetch(path)
    console.log(res)
    const json = await res.json()
    console.log(json)
    const formattedData = json.response.results.map((article) => {
      const data = {
        title: article.webTitle, 
        url: article.webUrl,
        snippet: '',
      }
      if ('fields' in article) {
        console.log(article.fields)
        data.image_url = article.fields.thumbnail
      }
      return data
    })
    console.log(formattedData)
    return formattedData
  } catch(err) {
    console.log('error', err)
  }
}

export default getNews;
 
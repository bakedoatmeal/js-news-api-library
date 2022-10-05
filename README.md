# News API Library

This news API library allows users to quickly get results from multiple different news APIs (NYT, Guardian, News API) in a standardized format. 

## function getNews(apiKey, source)

Takes an apiKey object and a source string (’nyt’, ‘guardian’ or ‘’ for news API)

Returns a promise with the following data: 

snippet: the abstract or snippet of an article

title: the article title

url: the link to the article on the original news site

image_url: a url to the preview image for the article 

Alternatively, users can search use functions for each specific news API: 

## function getGuardian(apiKey)

Takes the Guardian API key as a string and returns a promise with the data formatted as described in the getNews() function.

## function getNYT(apiKey)

Takes the NYT API key as a string and returns a promise with the data formatted as described in the getNews() function.  

## function getNewsAPI(apiKey)

Takes the NewsAPI api key as a string and returns a promise with the data formatted as described in the getNews() function.
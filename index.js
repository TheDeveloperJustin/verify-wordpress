// This file takes a list of webites (websites.txt)
// checks if it uses Wordpress, and appends 
// to wordpressWebsites.txt if so

const axios = require('axios')
const fs = require('fs')

// Append Line wot wordpressWebsites.txt
const appendLine = (text) => {
  try {
    fs.appendFile('./wordpressWebsites.txt', `${text}\n`, 'utf8', (err) => {
      if (err) {
        console.error('Error appending to file:', err);
        return;
      }
  })
  } catch (err) {
    console.log(err.message)
  }
}

// Check for Wordpress
async function checkWpConfigExists(url) {
  try {
    const response = await axios.get(url)
    const html = response.data

    // Check if the source code contains source file wp-content
    if (html.includes('/wp-content')) {
      appendLine(url)
      console.log('Website is wordpress')
    } else {
      console.log('Website is not wordpress')
    }
  } catch (error) {
    console.error('Error occurred while checking for wordpress:', error)
  }
}

// Read websites.txt for websites to search
const readStream = fs.createReadStream('./websites.txt', 'utf8')

readStream.on('data', (file) => {
  const websites = file.split('\n')

  websites.forEach(website => {
    checkWpConfigExists(website)
  })
})
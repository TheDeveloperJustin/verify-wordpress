// This file takes a list of webites (websites.txt)
// checks if it uses Wordpress or squarespace, and appends 
// to validWebsites.txt if so

const axios = require('axios')
const fs = require('fs')

// Append Line to validWebsites.txt
const appendLine = (text) => {
  try {
    fs.appendFile('./validWebsites.txt', `${text}\n`, 'utf8', (err) => {
      if (err) {
        console.error('Error appending to file:', err);
        return;
      }
  })
  } catch (err) {
    console.log(err.message)
  }
}

// Check for Wordpress or Squarespace
async function checkIfValidWebsite(url) {
  try {
    const response = await axios.get(url)
    const html = response.data

    // Check if the source code contains wordpress or squarespace
    if (html.includes('/wp-content') || html.includes('squarespace')) {
      appendLine(url)
      console.log('Website is Wordpress or Squarespace')
    } else {
      console.log('Website is not Wordpress or Squarespace')
    }
  } catch (err) {
    console.error('Error occurred while checking website:', error)
  }
}

// Read websites.txt for websites to search
const readStream = fs.createReadStream('./websites.txt', 'utf8')

readStream.on('data', (file) => {
  const websites = file.split('\n')

  websites.forEach(website => {
    checkIfValidWebsite(website)
  })
})
const express = require('express')
const { exec } = require('child_process')
var favicon = require('serve-favicon')

const path = require('path')

const app = express()
const port = 9000

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('cmd')
})

app.get('/cmd/:command', (req, res) => {
  // Example CMD command to get IP configuration
  const cmd = req.params.command

  if (cmd === 'login') {
  }

  exec(cmd, { encoding: 'utf8' }, (error, stdout, stderr) => {
    if (error) {
      return res.json({ success: false, error: error.message })
    }
    if (stderr) {
      return res.json({ success: false, error: stderr })
    }

    // Replace \r\n with \n for plain text
    const formattedOutput = stdout.replace(/\r\n/g, '<br>')

    // Send the cleaned up output as a JSON response
    res.json({ success: true, output: formattedOutput })
  })
})

// cheenu meenu

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

const pathArticles = path.join(__dirname, 'articles', 'articles.json')

app.get('/', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8')
  const articles = JSON.parse(articlesData)

  res.render('index', { articles })
})

app.get('/article/:fileName', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8')
  const articles = JSON.parse(articlesData)

  const article = articles.find(a => a.fileName === req.params.fileName)

  if(article) {
    res.render('article', { article })
  } else {
    res.status(404).send('Article not found');
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
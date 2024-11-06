const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ urlencoded: true }))

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

// Admin section
function generateFileName(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

app.get('/admin', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8')
  const articles = JSON.parse(articlesData)
  
  res.render('admin', { articles })
})

app.get('/admin/new', (req, res) => {
  res.render('admin/new')
})

app.post('/admin/new', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8')
  const articles = JSON.parse(articlesData)

  const fileName = generateFileName(req.body.title)

  const newArticle = {
    title: req.body.title,
    date: new Date().toISOString().split('T')[0],
    content: req.body.content,
    fileName: fileName
  }

  articles.push(newArticle)

  fs.writeFileSync(pathArticles, JSON.stringify(articles))
  res.redirect('/admin')
})

app.get('/admin/edit/:fileName', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8');
  const articles = JSON.parse(articlesData);

  const article = articles.find(a => a.fileName === req.params.fileName);
  if (!article) {
    return res.status(404).send('Article not found');
  }

  res.render('admin/edit', { article });
});

app.post('/admin/edit/:fileName', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8');
  const articles = JSON.parse(articlesData);
  
  const articleIndex = articles.findIndex(a => a.fileName === req.params.fileName)
  if(articleIndex === -1) {
    return res.statusCode(404).send('Article not found')
  }

  articles[articleIndex] = {
    ...articles[articleIndex],
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }

  fs.writeFileSync(pathArticles, JSON.stringify(articles))
  res.redirect('/admin')
})

app.post('/admin/delete/:fileName', (req, res) => {
  const articlesData = fs.readFileSync(pathArticles, 'utf-8')
  const  articles = JSON.parse(articlesData)

  const updatedArticles = articles.filter(a => a.fileName !== req.params.fileName)
  fs.writeFileSync(pathArticles, JSON.stringify(updatedArticles))
  res.redirect('/admin')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
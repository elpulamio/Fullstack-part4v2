const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const blogPost =
    {
      title: 'Docker',
      author: 'Bret Fisher',
      url: 'https://www.bretfisher.com/',
      likes: 5
    }

test('testing post', async() => {

  const count = await Blog.count()
  await api
    .post('/api/blogs')
    .send(blogPost)
  const count2 = await Blog.count()
  const response = await api.get('/api/blogs')
  const blogBody = response.body.map(b => b)
  expect(count2).toBe(count + 1)
  expect(blogPost.title).toBe(blogBody[count].title)
  expect(blogPost.author).toBe(blogBody[count].author)
  expect(blogPost.url).toBe(blogBody[count].url)
  expect(blogPost.likes).toBe(blogBody[count].likes)
})

afterAll(() => {
  mongoose.connection.close()
})
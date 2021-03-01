const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlog =
  {
    title: 'Docker and more',
    author: 'Bret Fisher',
    url: 'https://www.bretfisher.com/'
  }

test('no likes', async () => {
  await Blog.deleteMany({})
  const blog = new Blog(initialBlog)
  await blog.save()
  const response = await api.get('/api/blogs')
  const blogBody = response.body.map(b => b)
  expect(blogBody[0].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
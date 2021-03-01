const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlog =
  {
    title: 'Docker and Kubernetes',
    author: 'Bret Fisher',
    url: 'https://www.bretfisher.com/',
    likes: 5
  }

test('identifier is named id', async () => {
  await Blog.deleteMany({})
  const blog = new Blog(initialBlog)
  await blog.save()
  const response = await api.get('/api/blogs')
  const blogBody = response.body.map(b => b)
  expect(blogBody[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
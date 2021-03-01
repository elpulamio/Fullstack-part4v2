const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Docker and Kubernetes',
    author: 'Bret Fisher',
    url: 'https://www.bretfisher.com/',
    likes: 5
  },
  {
    title: 'DevOps and Docker',
    author: 'Bret Fisher',
    url: 'https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg',
    likes: 10
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
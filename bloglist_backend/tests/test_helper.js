const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
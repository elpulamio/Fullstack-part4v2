const _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (listWithOneBlog) => {
  let total = listWithOneBlog.reduce(function (sum, blog) {
    return sum + parseInt(String(blog.likes))
  }, 0)
  return total
}

const totalLikesBlogs = (blogs) => {
  let total = blogs.reduce(function (sum, blog) {
    return sum + parseInt(String(blog.likes))
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  function getLikes(){
    return blogs.map(blog => blog.likes)
  }
  function getMaxLikes(){
    return Math.max(...getLikes())
  }
  return blogs.filter(blog => blog.likes === getMaxLikes()).map(rightBlog => ({ 'title': rightBlog['title'], 'author': rightBlog['author'], 'likes': rightBlog['likes'] }))
}

const mostBlogs = (blogs) => {
  const result = _.values(_(blogs.map(blog => blog.author))
    .countBy()
    .entries()
    .maxBy(_.last))

  return JSON.parse(`{"author": "${result[0]}", "blogs": ${result[1]}}`)
}

const mostLikes = (blogs) => {
  let likes = 0
  let likes2 = 0
  let likesMax = 0
  let currentBlogs = blogs.map(b => b)
  let name = blogs[0].author
  let name2 = ''
  let nameMax = ''
  let countZ = 0
  let countY = 0

  for (let x = 0; x < currentBlogs.length; x++){
    if (countZ > 0){
      name2 = currentBlogs[x].author
      for (let z = 0; z < currentBlogs.length; z++){
        if (name2 === currentBlogs[z].author){
          likes2 = likes2 + currentBlogs[z].likes
        }
      }
      if (likes2 > likes && likes2 > likesMax){
        likesMax = likes2
        nameMax = name2
      }
      else if (likes > likes2 && likes > likesMax){
        likesMax = likes
        nameMax = name
      }
      likes = 0
      likes2 = 0
    }
    for (let y = 0; y < currentBlogs.length; y++){
      if (name === currentBlogs[y].author && countY === 0){
        likes = likes + currentBlogs[y].likes
      }
    }
    countY++
    countZ++
  }
  return JSON.parse(`{"author": "${nameMax}", "likes": ${likesMax}}`)
}

module.exports = {
  dummy,
  totalLikes,
  totalLikesBlogs,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


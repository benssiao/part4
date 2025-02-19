import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

async function getAll() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function postBlog(blog, token) {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: 'Bearer ' + token } })
  return response.data
}

async function updateBlog(updateBlog, token) {
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`
    , { ...updateBlog }
    , { headers: { Authorization: 'Bearer ' + token } })
  return response.data
}

async function removeBlog(removeBlog, token) {
  const response = await axios.delete(`${baseUrl}/${removeBlog.id}`
    , { headers: { Authorization: 'Bearer ' + token } })
  return response.data
}

export default { getAll, postBlog, updateBlog, removeBlog }
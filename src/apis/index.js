import axios from 'axios'

const baseUrl = 'https://polls.apiblueprint.org'
const headers = {
  'Content-Type': 'application/json'
}

const getQuestions = () => {
  return axios.get(`${baseUrl}/questions`).then(res => {
    return res.data
  })
}

const getQuestionById = (url) => {
  if (!url) return
  return axios.get(`${baseUrl}${url}`).then(res => {
    return res.data
  })
}

const createQuestion = (data) => {
  if (!data) return
  return axios.post(`${baseUrl}/questions`, data, { headers }).then(res => {
    return res.data
  })
}

const voteChoiceByQuestionId = (url) => {
  if (!url) return
  return axios.post(`${baseUrl}${url}`).then(res => {
    return res.data
  })
}

export {
  getQuestions,
  getQuestionById,
  createQuestion,
  voteChoiceByQuestionId
}

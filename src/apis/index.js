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

const getQuestionById = (id) => {
  return axios.get(`${baseUrl}/questions/${id}`).then(res => {
    return res.data
  })
}

const createQuestion = (data) => {
  return axios.post(`${baseUrl}/questions`, data, { headers }).then(res => {
    return res.data
  })
}

const voteChoiceByQuestionId = (questionId, choiceId) => {
  return axios.post(`${baseUrl}/questions/${questionId}/choices/${choiceId}`).then(res => {
    return res.data
  })
}

export {
  getQuestions,
  getQuestionById,
  createQuestion,
  voteChoiceByQuestionId
}

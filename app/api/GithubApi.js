import config from '../config'
import util from 'util'
const githubEndpoint = config.githubEndpoint

export const fetchAccountDetail = async accountname => {
  const url = util.format(githubEndpoint.accountDetail, accountname)
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson
}

export const fetchProjectList = async accountname => {
  const url = util.format(githubEndpoint.accountRepos, accountname)
  const response = await fetch(url)
  const projectList = await response.json()
  return projectList
}
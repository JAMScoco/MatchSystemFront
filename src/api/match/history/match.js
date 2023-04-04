import request from '@/utils/request'

// 查询赛事列表
export function listMatch(query) {
  return request({
    url: '/match/history/list',
    method: 'get',
    params: query
  })
}

// 查询赛事详细
export function getMatch(id) {
  return request({
    url: '/match/history/' + id,
    method: 'get'
  })
}

// 新增赛事
export function addMatch(data) {
  return request({
    url: '/match/history',
    method: 'post',
    data: data
  })
}

// 修改赛事
export function updateMatch(data) {
  return request({
    url: '/match/history',
    method: 'put',
    data: data
  })
}

// 新增赛事文件
export function addMatchFile(data) {
  return request({
    url: '/match/history/addMatchFile',
    method: 'put',
    data: data
  })
}

// 删除赛事文件
export function delMatchFile(data) {
  return request({
    url: '/match/history/delMatchFile',
    method: 'put',
    data: data
  })
}

// 删除赛事
export function delMatch(id) {
  return request({
    url: '/match/history/' + id,
    method: 'delete'
  })
}

// 查询当前赛事
export function getCurrentMatch() {
  return request({
    url: '/match/history/getCurrentMatch/',
    method: 'get'
  })
}

// 查询当前赛事
export function getFiles() {
  return request({
    url: '/match/history/getFiles/',
    method: 'get'
  })
}


// 查询当前赛事推荐名额
export function queryRecommendNum() {
  return request({
    url: '/match/history/queryRecommendNum/',
    method: 'get'
  })
}
export function submitRecommendNum(data) {
  return request({
    url: '/match/history/saveRecommendNum',
    method: 'post',
    params: data
  })
}

export function queryReviewCount() {
  return request({
    url: '/match/history/queryReviewCount/',
    method: 'get'
  })
}

export function importInfo(data) {
  return request({
    url: '/school/info/importInfo/',
    method: 'post',
    params: data
  })
}

export function importUndergraduate(data) {
  return request({
    url: '/school/info/importUndergraduate/',
    method: 'post',
    params: data
  })
}

export function importGraduate(data) {
  return request({
    url: '/school/info/importGraduate/',
    method: 'post',
    params: data
  })
}

export function queryFilePath(name) {
  return request({
    url: `/school/info/queryFilePath?name=${name}`,
    method: 'get',
  })
}

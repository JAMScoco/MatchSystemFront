import request from '@/utils/request'

// 查询赛事列表
export function listMatch(query) {
  return request({
    url: '/school/match/list',
    method: 'get',
    params: query
  })
}

// 查询赛事详细
export function getMatch(id) {
  return request({
    url: '/school/match/' + id,
    method: 'get'
  })
}

// 新增赛事
export function addMatch(data) {
  return request({
    url: '/school/match',
    method: 'post',
    data: data
  })
}

// 修改赛事
export function updateMatch(data) {
  return request({
    url: '/school/match',
    method: 'put',
    data: data
  })
}

// 删除赛事
export function delMatch(id) {
  return request({
    url: '/school/match/' + id,
    method: 'delete'
  })
}

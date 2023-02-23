import request from '@/utils/request'

// 查询评审分值列表
export function listScore(query) {
  return request({
    url: '/work/score/list',
    method: 'get',
    params: query
  })
}

// 查询评审分值详细
export function getScore(id) {
  return request({
    url: '/work/score/' + id,
    method: 'get'
  })
}

// 新增评审分值
export function addScore(data) {
  return request({
    url: '/work/score',
    method: 'post',
    data: data
  })
}

// 修改评审分值
export function updateScore(data) {
  return request({
    url: '/work/score',
    method: 'put',
    data: data
  })
}

// 删除评审分值
export function delScore(id) {
  return request({
    url: '/work/score/' + id,
    method: 'delete'
  })
}

// 查询评审分值列表
export function getScoreDetails() {
  return request({
    url: '/work/score/details',
    method: 'get',
  })
}

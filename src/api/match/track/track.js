import request from '@/utils/request'

// 查询赛事对应的赛道信息列表
export function listTrack(query) {
  return request({
    url: '/match/track/list',
    method: 'get',
    params: query
  })
}

// 查询赛事对应的赛道信息详细
export function getTrack(id) {
  return request({
    url: '/match/track/' + id,
    method: 'get'
  })
}

// 新增赛事对应的赛道信息
export function addTrack(data) {
  return request({
    url: '/match/track',
    method: 'post',
    data: data
  })
}

// 修改赛事对应的赛道信息
export function updateTrack(data) {
  return request({
    url: '/match/track',
    method: 'put',
    data: data
  })
}

// 删除赛事对应的赛道信息
export function delTrack(id) {
  return request({
    url: '/match/track/' + id,
    method: 'delete'
  })
}

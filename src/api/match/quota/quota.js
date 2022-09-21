import request from '@/utils/request'

// 查询推荐的作品名额列表
export function listQuota(query) {
  return request({
    url: '/match/quota/list',
    method: 'get',
    params: query
  })
}

// 查询推荐的作品名额详细
export function getQuota(id) {
  return request({
    url: '/match/quota/' + id,
    method: 'get'
  })
}

// 新增推荐的作品名额
export function addQuota(data) {
  return request({
    url: '/match/quota',
    method: 'post',
    data: data
  })
}

// 修改推荐的作品名额
export function updateQuota(data) {
  return request({
    url: '/match/quota',
    method: 'put',
    data: data
  })
}

// 删除推荐的作品名额
export function delQuota(id) {
  return request({
    url: '/match/quota/' + id,
    method: 'delete'
  })
}

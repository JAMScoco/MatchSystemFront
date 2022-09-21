import request from '@/utils/request'

// 查询组别列表
export function listGroup(query) {
  return request({
    url: '/match/group/list',
    method: 'get',
    params: query
  })
}

// 查询组别详细
export function getGroup(id) {
  return request({
    url: '/match/group/' + id,
    method: 'get'
  })
}

// 新增组别
export function addGroup(data) {
  return request({
    url: '/match/group',
    method: 'post',
    data: data
  })
}

// 修改组别
export function updateGroup(data) {
  return request({
    url: '/match/group',
    method: 'put',
    data: data
  })
}

// 删除组别
export function delGroup(id) {
  return request({
    url: '/match/group/' + id,
    method: 'delete'
  })
}

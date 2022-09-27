import request from '@/utils/request'

// 查询参与成员列表
export function listMember(query) {
  return request({
    url: '/works/member/list',
    method: 'get',
    params: query
  })
}

// 查询参与成员详细
export function getMember(id) {
  return request({
    url: '/works/member/' + id,
    method: 'get'
  })
}

// 新增参与成员
export function addMember(data) {
  return request({
    url: '/works/member',
    method: 'post',
    data: data
  })
}

// 修改参与成员
export function updateMember(data) {
  return request({
    url: '/works/member',
    method: 'put',
    data: data
  })
}

// 删除参与成员
export function delMember(id) {
  return request({
    url: '/works/member/' + id,
    method: 'delete'
  })
}

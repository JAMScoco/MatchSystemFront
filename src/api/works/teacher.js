import request from '@/utils/request'

// 查询指导老师列表
export function listTeacher(query) {
  return request({
    url: '/works/teacher/list',
    method: 'get',
    params: query
  })
}

// 查询指导老师详细
export function getTeacher(id) {
  return request({
    url: '/works/teacher/' + id,
    method: 'get'
  })
}

// 新增指导老师
export function addTeacher(data) {
  return request({
    url: '/works/teacher',
    method: 'post',
    data: data
  })
}

// 修改指导老师
export function updateTeacher(data) {
  return request({
    url: '/works/teacher',
    method: 'put',
    data: data
  })
}

// 删除指导老师
export function delTeacher(id) {
  return request({
    url: '/works/teacher/' + id,
    method: 'delete'
  })
}

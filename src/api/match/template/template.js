import request from '@/utils/request'

// 查询评审模板列表
export function listTemplate(query) {
  return request({
    url: '/match/template/list',
    method: 'get',
    params: query
  })
}

// 查询评审模板详细
export function getTemplate(id) {
  return request({
    url: '/match/template/' + id,
    method: 'get'
  })
}

// 新增评审模板
export function addTemplate(data) {
  return request({
    url: '/match/template',
    method: 'post',
    data: data
  })
}

// 修改评审模板
export function updateTemplate(data) {
  return request({
    url: '/match/template',
    method: 'put',
    data: data
  })
}

// 删除评审模板
export function delTemplate(id) {
  return request({
    url: '/match/template/' + id,
    method: 'delete'
  })
}

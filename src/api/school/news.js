import request from '@/utils/request'

// 查询动态管理列表
export function listNews(query) {
  return request({
    url: '/school/news/list',
    method: 'get',
    params: query
  })
}


export function getAllNews() {
  return request({
    url: '/school/news/getAllNews',
    method: 'get',
  })
}

// 查询动态管理详细
export function getNews(id) {
  return request({
    url: '/school/news/' + id,
    method: 'get'
  })
}

// 新增动态管理
export function addNews(data) {
  return request({
    url: '/school/news',
    method: 'post',
    data: data
  })
}

// 修改动态管理
export function updateNews(data) {
  return request({
    url: '/school/news',
    method: 'put',
    data: data
  })
}

// 删除动态管理
export function delNews(id) {
  return request({
    url: '/school/news/' + id,
    method: 'delete'
  })
}

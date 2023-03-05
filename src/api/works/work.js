import request from '@/utils/request'

// 查询作品列表
export function listWork(query) {
  return request({
    url: '/works/work/list',
    method: 'get',
    params: query
  })
}

// 查询作品详细
export function getWork(id) {
  return request({
    url: '/works/work/' + id,
    method: 'get'
  })
}

// 新增作品
export function addWork(data) {
  return request({
    url: '/works/work',
    method: 'post',
    data: data
  })
}

// 修改作品
export function updateWork(data) {
  return request({
    url: '/works/work',
    method: 'put',
    data: data
  })
}

// 审核作品
export function checkWork(data) {
  return request({
    url: '/works/work/check',
    method: 'put',
    data: data
  })
}

// 删除作品
export function delWork(id) {
  return request({
    url: '/works/work/' + id,
    method: 'delete'
  })
}

// 验证当前是否可以提交作品
export function validCommit() {
  return request({
    url: '/works/work/validCommit',
    method: 'get'
  })
}

// 获取当前用户当前赛事作品详细信息
export function currentWorkInfo() {
  return request({
    url: '/works/work/currentWorkInfo',
    method: 'get'
  })
}

// 获取当前赛事待评审作品id
export function waitReviewWorks() {
  return request({
    url: '/works/work/waitReviewWorks',
    method: 'get'
  })
}

// 作品评审结果管理列表
export function getReviewResult() {
    return request({
        url: '/works/work/result',
        method: 'get'
    })
}
// 移动排名
export function moveSort(data) {
  return request({
    url: '/works/work/moveSort',
    method: 'post',
    data: data
  })
}

export function recommendWork(id) {
  return request({
    url: `/works/work/recommend/${id}`,
    method: 'post',
  })
}





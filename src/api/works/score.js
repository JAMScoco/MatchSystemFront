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
export function getReviewTemplate(id) {
  return request({
    url: '/work/score/getReviewTemplate/' + id,
    method: 'get'
  })
}


// 提交评审分值
export function submitScore(data) {
  return request({
    url: '/work/score/submit',
    method: 'post',
    data: data
  })
}

// 查询评审分值列表
export function getScoreDetails() {
  return request({
    url: '/work/score/details',
    method: 'get',
  })
}

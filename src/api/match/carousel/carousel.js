import request from '@/utils/request'

// 查询发布赛事的轮播图列表
export function listCarousel(query) {
  return request({
    url: '/match/carousel/list',
    method: 'get',
    params: query
  })
}

// 查询发布赛事的轮播图详细
export function getCarousel(id) {
  return request({
    url: '/match/carousel/' + id,
    method: 'get'
  })
}

// 新增发布赛事的轮播图
export function addCarousel(data) {
  return request({
    url: '/match/carousel',
    method: 'post',
    data: data
  })
}

// 修改发布赛事的轮播图
export function updateCarousel(data) {
  return request({
    url: '/match/carousel',
    method: 'put',
    data: data
  })
}

// 删除发布赛事的轮播图
export function delCarousel(id) {
  return request({
    url: '/match/carousel/' + id,
    method: 'delete'
  })
}

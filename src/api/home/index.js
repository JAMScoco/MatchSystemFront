import request from '@/utils/request'

// 查询首页展示数据
export function getIndexInfo() {
    return request({
        url: '/match/history/getIndexInfo',
        method: 'get',
    })
}

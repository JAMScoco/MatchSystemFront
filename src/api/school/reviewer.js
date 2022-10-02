import request from '@/utils/request'

// 查询评审专家列表
export function listReviewer(query) {
    return request({
        url: '/system/reviewer/list',
        method: 'get',
        params: query
    })
}

// 新增评审专家
export function addReviewer(data) {
    return request({
        url: '/system/reviewer',
        method: 'post',
        data: data
    })
}

// 修改评审专家
export function updateReviewer(data) {
    return request({
        url: '/system/reviewer',
        method: 'put',
        data: data
    })
}

// 修改评审专家
export function genAssignData(data) {
    return request({
        url: '/system/reviewer/genAssignData',
        method: 'post',
        data: data
    })
}

//检查当前是否可以分配评审任务
export function checkCanAssign(){
    return request({
        url: '/system/reviewer/checkCanAssign',
        method: 'get',
    })
}



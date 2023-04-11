import request from '@/utils/request'

// 查询全部订单
export function fetchList(query) {
  return request({
    url: '/orderInfo/OrderList',
    method: 'post',
    params: query
  })
}
// 查询课程进度
export function fetchListOne(query) {
  return request({
    url: '/CourseInterface/QueryCourse',
    method: 'post',
    params: query
  })
}
// 查询课程信息
export function getSearchCourse(query) {
  return request({
    url: '/CourseInterface/SearchCourse',
    method: 'post',
    params: query
  })
}
// 课程下单
export function CourseInterface(query) {
  return request({
    url: '/CourseInterface/CourseSubmit',
    method: 'post',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

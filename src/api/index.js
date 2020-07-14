import { ajax } from './ajax'

// 1、获取课程介绍
export const reqCourseIntroduce = () => ajax('back/zblCourse/queryById')

// 2、获取课程学习人数
export const reqCourseLearners = () => ajax('evaluate/zblEvaluate/listCount', { queryContextNum: 1 })

// 3、获取活动列表
export const reqActivitys = (page, activityName) => ajax('activity/zblActivity/list', { activityName, pageNo: page, pageSize: 9 })

// 4、获取教师列表
export const reqTeachers = (roleItemId) => ajax('back/zblUser/list', { roleItemId, pageNo: 1, pageSize: 10 })

// 5、获取课程目录
export const reqCourseChapter = () => ajax('chapter/zblChapter/list', { pageNo: 1, pageSize: 0 })

// 6、获取pdf
export const reqGetPdfFile = (mainId, id) => ajax(`wordPdf/getPdfFile/${mainId}/${id}`, { pageNo: 1, pageSize: 10 })

// 7、获取章节注释
export const reqGetNote = (mainId) => ajax('notes/zblNotes/list', { pageNo: 1, pageSize: 1, chapterId: mainId })

// 8打卡/提问 提交
export const reqEvaluate = (evaluate) => ajax('evaluate/zblEvaluate/add', evaluate, 'post')

// 9获取交流列表
export const reqEvaluateList = (context = '', isActiorchapter = 1, userId, page) => ajax('evaluate/zblEvaluate/appList', { context, pageNo: page, pageSize: 4, userId, isActiorchapter })

// 10获取交流列表
export const reqEvaluateComponents = (parentId) => ajax('evaluate/zblEvaluate/queryByParentId', { parentId })

// 11用户注册
export const reqUserRegister = (info) => ajax('front/login/register', info, 'post')

// 12用户登录
export const reqUserLogin = (info) => ajax('front/login/login', info, 'post')

// 13用户修改密码
export const setUserPassword = (info) => ajax('front/login/changPassword', info, 'put')

// 14用户登陆
export const getUserGroup = () => ajax('group/zblGroup/users')

// 15验证token
export const checkToken = (token) => ajax('front/login/checkToken', token, 'check')

// 16上传头像
export const uploadAvatar = (data) => ajax('sys/common/upload', data, 'post')

// 17修改头像
export const editAvatar = (data) => ajax('back/zblUser/edit', data, 'put')

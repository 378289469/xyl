import ajax from './ajax'

// 1、获取课程介绍
export const reqCourseIntroduce = () => ajax('back/zblCourse/queryById')

// 2、获取课程学习人数
export const reqCourseLearners = () => ajax('evaluate/zblEvaluate/listCount', { queryContextNum: 1 })

// 3、获取活动列表
export const reqActivitys = () => ajax('activity/zblActivity/list', { pageNo: 1, pageSize: 0 })

// 4获取活动章节

// 5、获取教师列表
export const reqTeachers = () => ajax('back/zblUser/list')

// 6获取课程目录

// 7获取一级目录

// 8获取目录注释

// 9获取目录资源

// 10获取打卡/提问列表

// 11发起打卡/提问

// 12用户注册

// 13用户登陆

// 14退出登陆

// 15修改密码

// 16修改个人信息

// 17获取验证码

// 18获取token

// 19获取小组成员

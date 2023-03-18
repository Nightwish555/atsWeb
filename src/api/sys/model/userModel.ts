/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * @description: Register interface parameters
 */
export interface RegisterParams {
  name: string
  username: string
  password: string
  email: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  data: any
  // userId: string | number
  // token: string
  // role: RoleInfo
}

/**
 * @description: register interface return value
 */
export interface RegisterResultModel {
  code: number
  success: boolean
  data: any
  message: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: number
  // 用户id
  id: number
  // 用户名
  username: string
  // 真实名字
  name: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
}

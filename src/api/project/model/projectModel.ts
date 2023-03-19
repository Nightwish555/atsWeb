/**
 * @description: project request参数
 */
export interface ProjectParams {
  name: string
  app: string
  owner: number
  private: boolean
  description: string
}

/**
 * @description: project api response参数
 */
export interface ProjectModal {
  data: any
}

/**
 * @description: project list request参数
 */
export interface ProjectListParams {
  page: number
  size: number
  name: string
}

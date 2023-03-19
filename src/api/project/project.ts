import { defHttp } from '/@/utils/http/axios'

import { ProjectParams, ProjectListParams, ProjectModal } from './model/projectModel'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  insert = '/project/insert',
  list = '/project/list',
}

/**
 * @description: project insert api
 */
export function projectInsertApi(params: ProjectParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ProjectModal>(
    {
      url: Api.insert,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: project list api
 */
export function projectListApi(params: ProjectListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<ProjectModal>(
    {
      url: Api.list,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

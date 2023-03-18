import { defHttp } from '/@/utils/http/axios'

import { ProjectParams, ProjectResultModal } from './model/projectModel'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  insert = '/project/insert',
  list = '/project/list',
}

/**
 * @description: user project insert api
 */
export function projectInsertApi(params: ProjectParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ProjectResultModal>(
    {
      url: Api.insert,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

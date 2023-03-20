import type { ProjectInfo } from '/#/store'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { projectInsertApi, projectListApi } from '/@/api/project/project'
import {
  ProjectParams,
  ProjectModal,
  ProjectListParams,
  ProjectListInfoModal,
} from '/@/api/project/model/projectModel'
import { router } from '/@/router'
import { usePermissionStore } from '/@/store/modules/permission'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { isArray } from '/@/utils/is'
import { h } from 'vue'
import { number } from 'vue-types'
import lib from '@ant-design/icons-vue'

interface ProjectState {
  projectList: []
  total: number
}

export const useProjectStore = defineStore({
  id: 'app-project',
  state: (): ProjectState => ({
    projectList: [],
    total: 0,
  }),
  getters: {
    getProjectList(): [] {
      return this.projectList
    },
    getTotal(): number {
      return this.total
    },
  },
  actions: {
    setProjectList(list: []) {
      this.projectList = list
    },
    setTotal(num: number) {
      this.total = num
    },
    async insert(params: ProjectParams): Promise<ProjectModal | null> {
      try {
        const data = await projectInsertApi(params)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async list(params: ProjectListParams): Promise<ProjectListInfoModal | null> {
      try {
        const result = await projectListApi(params)
        const { data, total } = result
        this.setProjectList(data)
        this.setTotal(total)
        return { data, total }
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})

import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const project: AppRouteModule = {
  path: '/project',
  name: 'Project',
  component: LAYOUT,
  redirect: '/project/index',
  meta: {
    orderNo: 10,
    hideChildrenInMenu: true,
    icon: 'ion:folder',
    title: t('routes.demo.project.project'),
  },
  children: [
    {
      path: 'index',
      name: 'Project',
      component: () => import('/@/views/project/index.vue'),
      meta: {
        title: t('routes.demo.project.project'),
        hideMenu: true,
      },
    },
    {
      path: 'project/:id',
      name: 'ProjectDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.project.detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/project/index',
      },
      component: '/@/views/project/ProjectDetail.vue',
    },
  ],
}

export default project

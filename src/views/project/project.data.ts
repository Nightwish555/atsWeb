import { getListUser } from '/@/api/sys/user'
import { FormSchema } from '/@/components/Table'

export const searchFormSchema: FormSchema[] = [
  {
    field: 'project',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 16 },
  },
]

export const projectFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '项目名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入项目名称',
      },
      // TODO 后面走后端修复
      // {
      //   validator(_, value) {
      //     return new Promise<void>((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败')
      //         })
      //     })
      //   },
      // },
    ],
  },
  {
    field: 'app',
    label: '服务名',
    component: 'Input',
    required: true,
  },
  {
    field: 'owner',
    label: '项目负责人',
    component: 'ApiSelect',
    componentProps: {
      api: getListUser,
      valueField: 'id',
      labelField: 'username',
    },
    required: true,
  },
  {
    field: 'private',
    label: '是否私有',
    component: 'Switch',
    required: false,
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: false,
  },
]

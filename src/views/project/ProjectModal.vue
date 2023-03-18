<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建项目" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { projectFormSchema } from './project.data'
  import { projectInsertApi } from '/@/api/project/project'
  import { useUserStoreWithOut } from '/@/store/modules/user'

  const isUpdate = ref(true)
  const rowId = ref('')
  const userStore = useUserStoreWithOut()

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: projectFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  })

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields()
    setModalProps({ confirmLoading: false })
    isUpdate.value = !!data?.isUpdate

    if (unref(isUpdate)) {
      rowId.value = data.record.id
      setFieldsValue({
        ...data.record,
      })
    }

    // const treeData = await getDeptList()
    // updateSchema([
    //   {
    //     field: 'pwd',
    //     show: !unref(isUpdate),
    //   },
    //   {
    //     field: 'dept',
    //     componentProps: { treeData },
    //   },
    // ])
  })
  async function handleSubmit() {
    try {
      const values = await validate()
      setModalProps({ confirmLoading: true })
      // TODO custom api

      console.log(values)
      console.log(userStore.getToken)
      const result = await projectInsertApi(values)
      console.log(result)

      closeModal()
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>

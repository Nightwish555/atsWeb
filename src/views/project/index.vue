<template>
  <PageWrapper class="link" title="项目列表">
    <template #headerContent>
      <div class="flex md:mt-3 mb-3">
        <div class="ant-col-18">
          <a-button type="primary" size="middle" shape="round" @click="handleCreate"
            >创建项目
            <a-tooltip placement="topLeft" title="只有超级管理员才能创建项目" color="#2db7f5">
              <QuestionCircleFilled style="padding-left: 6px"
            /></a-tooltip>
          </a-button>
        </div>
        <a-input-search
          v-model:value="value"
          placeholder="请输入项目名称"
          style="width: 300px"
          @search="onSearch"
        />
      </div>
    </template>
    <div>
      <ProjectCard :loading="loading" class="enter-y" />
    </div>
    <ProjectModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import ProjectCard from './ProjectCard.vue'
  import { PageWrapper } from '/@/components/Page'
  import { QuestionCircleFilled } from '@ant-design/icons-vue'
  import { useModal } from '/@/components/Modal/src/hooks/useModal'
  import ProjectModal from './ProjectModal.vue'

  const loading = ref(false)

  const [registerModal, { openModal }] = useModal()
  const value = ref<string>('')

  const onSearch = (searchValue: string) => {
    console.log('use value', searchValue)
    console.log('or use this.value', value.value)
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    })
  }

  function handleSuccess() {
    // if (isUpdate) {
    //   // 演示不刷新表格直接更新内部数据。
    //   // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    //   const result = updateTableDataRecord(values.id, values)
    //   console.log(result)
    // } else {
    //   reload()
    // }
  }

  setTimeout(() => {
    loading.value = false
  }, 1000)
</script>
<style>
  .ant-col-18 {
    flex: 0 0 75%;
  }

  .link {
    margin-top: 10px;
    font-size: 14px;
  }
</style>

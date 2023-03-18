<template>
  <!-- <LoginFormTitle v-show="getShow" class="enter-x" /> -->
  <Tabs v-model:activeKey="activeKey" @change="setLoginState(activeKey)">
    <TabPane key="0">
      <template #tab>
        <span>
          <apple-outlined />
          账号登录
        </span>
      </template>
      <Form
        class="p-4 enter-x"
        :model="formData"
        :rules="getFormRules"
        ref="formRef"
        v-show="getShow"
        @keypress.enter="handleLogin"
      >
        <FormItem name="account" class="enter-x">
          <Input
            size="large"
            v-model:value="formData.account"
            :placeholder="t('sys.login.userName')"
            class="fix-auto-fill"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" />
            </template>
          </Input>
        </FormItem>
        <FormItem name="password" class="enter-x">
          <InputPassword
            size="large"
            visibilityToggle
            v-model:value="formData.password"
            :placeholder="t('sys.login.password')"
            ><template #prefix>
              <LockOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" />
            </template>
          </InputPassword>
        </FormItem>

        <ARow class="enter-x">
          <ACol :span="12">
            <FormItem>
              <!-- No logic, you need to deal with it yourself -->
              <Checkbox v-model:checked="rememberMe" size="small">
                {{ t('sys.login.rememberMe') }}
              </Checkbox>
            </FormItem>
          </ACol>
          <ACol :span="12">
            <FormItem :style="{ 'text-align': 'right', color: '#1890ff' }">
              <!-- No logic, you need to deal with it yourself -->
              <Button type="link" size="small" @click="setLoginState('2')">
                {{ t('sys.login.forgetPassword') }}
              </Button>
            </FormItem>
          </ACol>
        </ARow>

        <FormItem class="enter-x">
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            @click="handleLogin"
            :loading="loading"
          >
            {{ t('sys.login.loginButton') }}
          </Button>
        </FormItem>
        <ARow class="enter-x">
          <!-- <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol> -->
          <!-- <ACol :md="6" :xs="24">
            <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
              {{ t('sys.login.registerButton') }}
            </Button>
          </ACol> -->
        </ARow>
      </Form>
    </TabPane>
    <TabPane key="1">
      <template #tab>
        <span>
          <android-outlined />
          注册
        </span>
      </template>
    </TabPane>
  </Tabs>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'

  import { Checkbox, Form, Input, Row, Col, Button, Tabs, TabPane } from 'ant-design-vue'
  import { UserOutlined, LockOutlined, AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
  // import LoginFormTitle from './LoginFormTitle.vue'

  import { useI18n } from '/@/hooks/web/useI18n'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { useUserStore } from '/@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
  import { useDesign } from '/@/hooks/web/useDesign'
  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col
  const ARow = Row
  const FormItem = Form.Item
  const InputPassword = Input.Password

  const { t } = useI18n()
  const { notification, createErrorModal } = useMessage()
  const { prefixCls } = useDesign('login')
  const userStore = useUserStore()

  const { setLoginState, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const activeKey = ref('0')
  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: 'vben',
    password: '123456',
  })

  const { validForm } = useFormValid(formRef)

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
      })
      console.log(userInfo)

      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
          duration: 3,
        })
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      })
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <template v-if="getShow">
    <!-- <LoginFormTitle class="enter-x" /> -->
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="username" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.username"
          :placeholder="t('sys.login.userName')"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" /> </template
        ></Input>
      </FormItem>
      <!-- <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem> -->
      <FormItem name="name" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.name"
          :placeholder="t('sys.login.name')"
          class="fix-auto-fill"
        >
          <template #prefix>
            <TabletOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" /> </template
        ></Input>
      </FormItem>
      <FormItem name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.email')"
          class="fix-auto-fill"
        >
          <template #prefix>
            <MailOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" /> </template
        ></Input>
      </FormItem>
      <!-- <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem> -->
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" />
          </template>
        </StrengthMeter>
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" :style="{ color: '#1890ff' }" />
          </template>
        </InputPassword>
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        shape="round"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <!-- <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button> -->
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'
  // import LoginFormTitle from './LoginFormTitle.vue'
  import { Form, Input, Button, Checkbox, message } from 'ant-design-vue'
  import { UserOutlined, LockOutlined, TabletOutlined, MailOutlined } from '@ant-design/icons-vue'
  import { StrengthMeter } from '/@/components/StrengthMeter'
  // import { CountdownInput } from '/@/components/CountDown'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useUserStore } from '/@/store/modules/user'
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useDesign } from '/@/hooks/web/useDesign'

  const FormItem = Form.Item
  const InputPassword = Input.Password
  const { t } = useI18n()
  const { getLoginState } = useLoginState()
  const userStore = useUserStore()
  const { notification, createErrorModal } = useMessage()
  const { prefixCls } = useDesign('login')

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    sms: '',
    email: '',
    policy: false,
  })

  const { getFormRules } = useFormRules(formData)
  const { validForm } = useFormValid(formRef)
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

  async function handleRegister() {
    try {
      const data = await validForm()
      if (!data) return message.error('注册失败', 2)

      await userStore.register(data)
      message.success('注册成功', 2)

      loading.value = true
      const userInfo = await userStore.login({
        password: data.password,
        username: data.username,
        mode: 'none', //不要默认的错误提示
      })

      if (userInfo) {
        notification.success({
          message: `${t('sys.login.loginSuccessTitle')}: ${userInfo.name}`,
          duration: 3,
        })
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      })
    }
  }
</script>

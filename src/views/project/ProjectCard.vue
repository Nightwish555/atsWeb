<template>
  <div :class="`${prefixCls}__content`">
    <a-list>
      <a-row :gutter="16">
        <template v-for="item in list" :key="item.title">
          <a-col :span="6">
            <a-list-item>
              <a-card :hoverable="true" :class="`${prefixCls}__card`">
                <span class="flex">
                  <Icon :icon="item.icon" :color="item.color" size="30" />
                  <span class="text-lg ml-4">{{ item.title }}</span>
                </span>
                <div class="flex mt-4 h-10 text-secondary">{{ item.desc }}</div>
                <div class="flex justify-between text-secondary">
                  <span>{{ item.group }}</span>
                  <span>{{ item.date }}</span>
                </div>
              </a-card>
            </a-list-item>
          </a-col>
        </template>
      </a-row>
    </a-list>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Card, Row, Col, List } from 'ant-design-vue'
  import { Icon } from '/@/components/Icon'

  const items = [
    {
      title: 'Github',
      icon: 'carbon:logo-github',
      color: '',
      desc: '不要等待机会，而要创造机会。',
      group: '开源组',
      date: '2021-04-01',
    },
    {
      title: 'Vue',
      icon: 'ion:logo-vue',
      color: '#3fb27f',
      desc: '现在的你决定将来的你。',
      group: '算法组',
      date: '2021-04-01',
    },
    {
      title: 'Html5',
      icon: 'ion:logo-html5',
      color: '#e18525',
      desc: '没有什么才能比努力更重要。',
      group: '上班摸鱼',
      date: '2021-04-01',
    },
    {
      title: 'Angular',
      icon: 'ion:logo-angular',
      color: '#bf0c2c',
      desc: '热情和欲望可以突破一切难关。',
      group: 'UI',
      date: '2021-04-01',
    },
    {
      title: 'React',
      icon: 'bx:bxl-react',
      color: '#00d8ff',
      desc: '健康的身体是实目标的基石。',
      group: '技术牛',
      date: '2021-04-01',
    },
    {
      title: 'Js',
      icon: 'ion:logo-javascript',
      color: '#4daf1bc9',
      desc: '路是走出来的，而不是空想出来的。',
      group: '架构组',
      date: '2021-04-01',
    },
    {
      title: 'React',
      icon: 'bx:bxl-react',
      color: '#00d8ff',
      desc: '健康的身体是实目标的基石。',
      group: '技术牛',
      date: '2021-04-01',
    },
  ]

  export default defineComponent({
    components: {
      Icon,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      return {
        prefixCls: 'list-card',
        list: items,
      }
    },
  })
</script>
<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }
</style>

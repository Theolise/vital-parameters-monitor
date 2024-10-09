<script setup lang="ts">
defineProps<{
  logo?: string
  logoAlt?: string
  logoSize?: number
  title: any
  subtitle: string
  action?: {
    logo: string
    logoAlt: string
    action: () => void
  }
  customBorder?: string
}>()
</script>

<template>
  <div class="card-container" :class="customBorder">
    <div class="header">
      <div class="leading-content">
        <img
          v-if="logo"
          :alt="logoAlt"
          :src="`/${logo}.svg`"
          :width="logoSize"
          :height="logoSize"
        />
        <div class="titles">
          <span class="title">{{ title }}</span>
          <span>{{ subtitle }}</span>
        </div>
      </div>

      <img
        v-if="action"
        :alt="action.logoAlt"
        :src="`/${action.logo}.svg`"
        :width="24"
        :height="24"
        @click="action.action()"
      />
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;

    .leading-content {
      display: flex;
      gap: 16px;

      .titles {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .title {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

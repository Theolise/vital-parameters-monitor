<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  patient: any
}>()

const formData = ref({
  lastName: props.patient.lastName,
  firstName: props.patient.firstName,
  age: props.patient.age
})
</script>

<template>
  <div class="patient-form-container">
    <div class="form">
      <input v-model="formData.lastName" />
      <input v-model="formData.firstName" />
      <input v-model="formData.age" />

      <div class="bottom">
        <button @click="$emit('updatePatient', formData)">Save</button>
        <button @click="$emit('closeForm')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-form-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 100;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px;
    width: 40%;
    height: auto;
    background-color: #d6e6ff;

    > input {
      width: 100%;
      line-height: 24px;
      border: none;
    }

    .bottom {
      display: flex;
      gap: 8px;

      > button {
        padding: 12px;
        background-color: #f2f8ff;
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>

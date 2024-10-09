<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getPatient } from '@/services/patient.jsx'
import { getAlerts } from '@/utils/alert.js'
import { getChartConfig } from '@/utils/chartConfig.js'

import Card from '@/components/Card.vue'
import Line from '@/components/charts/Line.vue'
import PatientForm from '@/components/PatientForm.vue'
import Status from '@/components/Status.vue'

const route = useRoute()

const patient = ref(getPatient(route.params.id as string))
const patientFormOpened = ref(false)
const countVitals = ref(0)
const countVitalsBloodPressure = ref(0)

const status = computed(() => {
  let patientStatus = {} as any
  if (patient.value && patient.value.medicalRecordNumber) {
    patientStatus[patient.value.medicalRecordNumber] = 'stable'
    return getAlerts(
      patient.value,
      countVitals.value,
      countVitalsBloodPressure.value,
      patientStatus
    ).patientStatus[patient.value.medicalRecordNumber]
  } else {
    return ''
  }
})

const updateCountVitals = () => {
  if (countVitals.value < 4) {
    countVitals.value++
  } else {
    countVitals.value = 0
  }
}

const updateCountVitalsBloddPressure = () => {
  if (countVitalsBloodPressure.value < 2) {
    countVitalsBloodPressure.value++
  } else {
    countVitalsBloodPressure.value = 0
  }
}

const countVitalsInterval = setInterval(updateCountVitals, 60000)
const countVitalsBloodPressureInterval = setInterval(updateCountVitalsBloddPressure, 60000)

const updatePatient = (patientUpdated: any) => {
  if (patient.value) {
    patient.value.lastName = patientUpdated.lastName
    patient.value.firstName = patientUpdated.firstName
    patient.value.age = patientUpdated.age
  }
  closePatientForm()
}

const closePatientForm = () => {
  patientFormOpened.value = false
}

const openPatientForm = () => {
  patientFormOpened.value = true
}

onUnmounted(() => {
  clearInterval(countVitalsInterval)
  clearInterval(countVitalsBloodPressureInterval)
})
</script>

<template>
  <PatientForm
    v-if="patientFormOpened"
    :patient="patient"
    @close-form="closePatientForm()"
    @update-patient="updatePatient"
  />

  <div v-if="!patient?.id" class="not-found">No patient found with this id</div>
  <div v-else class="patient-detail-container">
    <div class="personal-info-container">
      <Card
        logo="user"
        logo-alt="User logo"
        :logo-size="48"
        :title="patient.medicalRecordNumber"
        :subtitle="`${patient.firstName} ${patient.lastName} - ${patient.age}`"
        :action="{ action: openPatientForm, logo: 'edit', logoAlt: 'Open the form' }"
        :custom-border="status == 'critical' ? 'critical' : undefined"
      >
        <Status :status="status" :with-label="true" />
      </Card>
    </div>

    <div class="chart-container">
      <Card
        logo="heart-rate"
        logo-alt="Heart rate logo"
        :logo-size="48"
        title="Heart rate"
        :subtitle="`${patient.vitals.heartRate[countVitals]} bpm`"
      >
        <Line
          id="chart-heart-rate"
          :data="getChartConfig(patient.vitals.heartRate, 'Heart rate', [], '#9F27F3')"
        />
      </Card>

      <Card
        logo="temperature"
        logo-alt="Temperature logo"
        :logo-size="48"
        title="Temperature"
        :subtitle="`${patient.vitals.temperature[countVitals]} °C`"
      >
        <Line
          id="chart-temperature"
          :data="getChartConfig(patient.vitals.temperature, 'Temperature', [], '#3E4FF7')"
        />
      </Card>

      <Card
        logo="blood-pressure"
        logo-alt="Blood pressure logo"
        :logo-size="48"
        title="Blood pressure"
        :subtitle="`${patient.vitals.bloodPressure[countVitalsBloodPressure].systolic} / ${patient.vitals.bloodPressure[countVitalsBloodPressure].diastolic} mm Hg`"
      >
        <Line
          id="chart-blood-pressure"
          :data="
            getChartConfig(
              patient.vitals.bloodPressure.map((bp) => bp.systolic),
              'Blood pressure',
              patient.vitals.bloodPressure.map((bp) => bp.diastolic),
              '#ff4568'
            )
          "
        />
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  font-size: 20px;
}

.patient-detail-container {
  display: flex;
  flex-direction: column;
  gap: 36px;

  .personal-info-container {
    display: flex;
    gap: 24px;

    > div:first-child {
      flex: 1;
    }
  }

  .chart-container {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    > div {
      width: auto;
      max-width: 50%;
    }
  }

  .critical {
    border: 1px solid #ff4568;
  }
}
</style>

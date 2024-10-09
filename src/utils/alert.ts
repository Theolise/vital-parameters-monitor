import { ALERTS, CRITICAL_ALERTS } from '@/constants/alerts'

export const checkVitals = (
  patients: any[],
  indexVitals: number,
  indexVitalsBloodPressure: number
) => {
  const vitals = {
    alerts: [],
    criticalAlerts: [],
    patientStatus: {}
  } as any
  patients.forEach((patient) => {
    vitals.patientStatus[patient.medicalRecordNumber] = 'stable'
    const patientAlerts = getAlerts(
      patient,
      indexVitals,
      indexVitalsBloodPressure,
      vitals.patientStatus
    )

    vitals.alerts = vitals.alerts.concat(patientAlerts.alerts)
    vitals.criticalAlerts = vitals.criticalAlerts.concat(patientAlerts.criticalAlerts)
  })

  return vitals
}

export const getAlerts = (
  patient: any,
  indexVitals: number,
  indexVitalsBloodPressure: number,
  patientStatus: any
) => {
  const alerts = [] as any[]
  const criticalAlerts = [] as any[]

  const heartRate = patient.vitals.heartRate[indexVitals]
  const bloodPressure = patient.vitals.bloodPressure[indexVitalsBloodPressure]
  const temperature = patient.vitals.temperature[indexVitals]

  checkHeartRate(heartRate, patient.age, patient.medicalRecordNumber, alerts, patientStatus)
  checkBloodPressure(bloodPressure, patient.age, patient.medicalRecordNumber, alerts, patientStatus)
  checkTemperature(temperature, patient.medicalRecordNumber, alerts, criticalAlerts, patientStatus)

  return { alerts, criticalAlerts, patientStatus }
}

export const checkHeartRate = (
  heartRate: number,
  age: number,
  medicalRecordNumber: string,
  alerts: any[],
  patientStatus: any
) => {
  if (age <= 18) {
    if (heartRate < 80) {
      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.LOW_HEART_RATE
      })
    } else if (heartRate > 120) {
      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.HIGH_HEART_RATE
      })
    }
  } else if (age > 18 && age < 65) {
    if (heartRate < 50) {
      patientStatus[medicalRecordNumber] = 'watch'
      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.LOW_HEART_RATE
      })
    } else if (heartRate > 80) {
      patientStatus[medicalRecordNumber] = 'watch'

      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.HIGH_HEART_RATE
      })
    }
  } else {
    if (heartRate < 70) {
      patientStatus[medicalRecordNumber] = 'watch'

      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.LOW_HEART_RATE
      })
    } else if (heartRate > 90) {
      patientStatus[medicalRecordNumber] = 'watch'

      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.HIGH_HEART_RATE
      })
    }
  }
}

export const checkTemperature = (
  temperature: number,
  medicalRecordNumber: string,
  alerts: any[],
  criticalAlerts: any[],
  patientStatus: any
) => {
  if (temperature >= 29 && temperature < 36.3) {
    patientStatus[medicalRecordNumber] = 'watch'

    alerts.push({
      id: medicalRecordNumber,
      message: ALERTS.LOW_TEMPERATURE
    })
  } else if (temperature > 37.5 && temperature <= 42.6) {
    patientStatus[medicalRecordNumber] = 'watch'

    alerts.push({
      id: medicalRecordNumber,
      message: ALERTS.HIGH_TEMPERATURE
    })
  } else if (temperature < 29) {
    patientStatus[medicalRecordNumber] = 'critical'

    criticalAlerts.push({
      id: medicalRecordNumber,
      message: CRITICAL_ALERTS.LOW_TEMPERATURE
    })
  } else if (temperature > 42.6) {
    patientStatus[medicalRecordNumber] = 'critical'

    criticalAlerts.push({
      id: medicalRecordNumber,
      message: CRITICAL_ALERTS.HIGH_TEMPERATURE
    })
  }
}

export const checkBloodPressure = (
  bloodPressure: any,
  age: number,
  medicalRecordNumber: string,
  alerts: any[],
  patientStatus: any
) => {
  if (age < 65) {
    if (
      (bloodPressure.systolic < 120 || bloodPressure.systolic > 140) &&
      (bloodPressure.diastolic < 60 || bloodPressure.diastolic > 80)
    ) {
      patientStatus[medicalRecordNumber] = 'watch'

      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.LOW_BLOOD_PRESSURE
      })
    }
  } else {
    if (
      (bloodPressure.systolic < 150 || bloodPressure.systolic > 170) &&
      (bloodPressure.diastolic < 60 || bloodPressure.diastolic > 90)
    ) {
      patientStatus[medicalRecordNumber] = 'watch'

      return alerts.push({
        id: medicalRecordNumber,
        message: ALERTS.HIGH_BLOOD_PRESSURE
      })
    }
  }
}

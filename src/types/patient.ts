export type Patient = {
  id: number
  firstName: string
  lastName: string
  age: number
  medicalRecordNumber: string
  vitals: Vitals
}

export type Vitals = {
  heartRate: number[]
  temperature: number[]
  bloodPressure: BLoodPressure[]
  oxygenSaturation: number[]
}

export type BLoodPressure = {
  systolic: number
  diastolic: number
}

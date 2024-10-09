import { patients } from '@/patients'

export const getPatients = () => {
  return patients
}

export const getPatient = (id: string) => {
  return patients.find((patient) => patient.id.toString() == id)
}

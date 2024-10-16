import type { Patient } from '@/types/patient'

export const patients: Patient[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 14,
    medicalRecordNumber: 'MR123456',
    vitals: {
      heartRate: [190, 75, 72, 78, 77],
      temperature: [46.5, 37.7, 37.0, 36.2, 34.1],
      bloodPressure: [
        { systolic: 120, diastolic: 80 },
        { systolic: 122, diastolic: 82 },
        { systolic: 118, diastolic: 78 }
      ],
      oxygenSaturation: [98, 97, 99, 96, 97]
    }
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 60,
    medicalRecordNumber: 'MR654321',
    vitals: {
      heartRate: [65, 70, 68, 72, 69],
      temperature: [36.8, 36.9, 37.0, 44.9, 36.7],
      bloodPressure: [
        { systolic: 130, diastolic: 85 },
        { systolic: 160, diastolic: 84 },
        { systolic: 132, diastolic: 86 }
      ],
      oxygenSaturation: [97, 96, 95, 97, 98]
    }
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Brown',
    age: 70,
    medicalRecordNumber: 'MR789012',
    vitals: {
      heartRate: [85, 88, 90, 87, 86],
      temperature: [37.5, 37.6, 37.8, 37.7, 37.6],
      bloodPressure: [
        { systolic: 140, diastolic: 90 },
        { systolic: 138, diastolic: 88 },
        { systolic: 142, diastolic: 92 }
      ],
      oxygenSaturation: [95, 94, 96, 93, 94]
    }
  }
]

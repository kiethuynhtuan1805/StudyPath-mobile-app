interface Profile {
  id: number;
  code: string;
  classCode: string;
  dateOfBirth: string | Date;
  firstName: string;
  lastName: string;
  major: { code: string; nameEn: string; nameVi: string };
  trainingManagementDep: {
    id: number;
    code: string;
    nameEn: string;
    nameVi: string;
  };
  gender: string;
  status: { code: string; id: number; name: string };
}
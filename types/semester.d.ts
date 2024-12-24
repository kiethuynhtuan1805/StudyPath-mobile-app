interface Diem {
  capnhat: string;
  diem: string;
  diemchu: string;
  diemcu: number;
  diemdat: string;
  diemso: number;
  diemthanhphanjson: null;
  dtbhk: string;
  dtbtl: string;
  ghichu: string;
  hocky: number;
  id: number;
  mahk: string;
  mamh: string;
  nhomlop: string;
  tc: number;
  tctlhk: string;
  tenhk: string;
  tenmhvn: string;
}
interface Course {
  id: number;
  code: string;
  name: string;
  semesterCode?: string;
  score?: number;
  n_credit: number;
  LEVEL: number;
  F_DVHT: number;
  F_TENMHVN: string;
  F_MAMH: string;
  prediction: number;
  KHOI: string;
}
interface Semester {
  code: string;
  courses: Course[];
  n_credit: number;
  score: number;
}

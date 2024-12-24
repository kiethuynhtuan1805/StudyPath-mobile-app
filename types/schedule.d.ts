interface Schedule {
    id: number;
    course?: Course;
    dayOfWeek?: number;
    startLesson?: number;
    numOfLesson?: number;
    startTime?: string;
    endTime?: string;
    room?: string;
    weekSeriesDisplay?:string[];
}
interface ScheduleBE {
    id: number;
    mssv: string;
    subject: {
        id: number;
        code: string;
        nameVi: string;
        nameEn: string;
        numOfCredits: number;
        numOfCourseCredits: number;
    };
    academicYear: number;
    semester: number;
    semesterYearCode: string;
    semesterYearName: string;
    employee: {
        id: number;
        code: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    subjectClassGroup: {
        id: number;
        subjectClassGroupCode: string;
        classGroup: string;
        subjectGroup: string;
    };
    room: {
        id: number;
        code: string;
        building: {
            id: number;
            code: string;
            campus: {
                id: number;
                code: string;
                nameVi: string;
                nameEn: string;
            };
            totalRoom: number;
            note: string;
        };
    };
    calendarYear: number;
    weeksCalendarBegin: number;
    dayOfWeek: number;
    startLesson: number;
    numOfLesson: number;
    startTime: string;
    endTime: string;
    weekSeriesDisplay: string;
    lastUpdatedTime: string;
}
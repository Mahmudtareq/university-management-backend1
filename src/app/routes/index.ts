import { Router } from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademiceFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademiceDepartmentRoutes } from '../modules/academiceDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademiceFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademiceDepartmentRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

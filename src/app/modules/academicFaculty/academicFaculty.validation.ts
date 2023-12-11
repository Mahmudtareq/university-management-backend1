import { z } from 'zod';

const createacAdemicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});
const updateAdemicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});

export const academicFacultyValidation = {
  createacAdemicFacultyValidationSchema,
  updateAdemicFacultyValidationSchema,
};

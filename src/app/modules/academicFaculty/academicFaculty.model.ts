import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
// check name is there or not
academicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isAcademicFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Faculty  is Already Exist!',
    );
  }

  next();
});

// check update , id update is is not exist ..then error
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery(); // give me a query id
  const isAcademicFacultyExist = await AcademicFaculty.findOne(query);
  if (!isAcademicFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Faculty  Does not Exist!',
    );
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);

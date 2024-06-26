import * as moment from 'moment';
import { Types } from 'mongoose';

import { mockSchoolDocumentList } from '../schools/schools.repository.mock';

import { UserDocument } from '@users/models/user.schema';

export const mockUserListDocument: UserDocument[] = [
  {
    _id: new Types.ObjectId('66029b303931e561b89eaff5'),
    email: 'tester1@sample.com',
    password: '$2a$10$zkqO3YE7uyijTo6yDl3deOfDZE0BgKUk7ThnNL6nVVMGe3gB3c/L2',
    role: 'admin',
  },
  {
    _id: new Types.ObjectId('66029fc4ce1fa5f8bedefb85'),
    email: 'tester2@sample.com',
    password: '$2a$10$WQY6beLgtnXrpvC7Z/zqiOsrq8eygsqUWmhw7L6PjcG.o5Y3kM/Uq',
    role: 'student',
  },
];

export const mockUserWithSubscribedSchoolList: UserDocument = {
  _id: new Types.ObjectId('660532dd8d1217b2da9e7d7c'),
  email: 'tester2@sample.com',
  password: '$2a$10$WQY6beLgtnXrpvC7Z/zqiOsrq8eygsqUWmhw7L6PjcG.o5Y3kM/Uq',
  role: 'student',
  subscribeList: [
    {
      _id: new Types.ObjectId('660533898d1217b2da9e7dac'),
      user: mockUserListDocument[1],
      school: mockSchoolDocumentList[0],
      isDeleted: false,
      createdAt: moment().startOf('m').subtract(1, 'h').toDate(),
      updatedAt: moment().startOf('m').subtract(1, 'h').toDate(),
    },
    {
      _id: new Types.ObjectId('660533968d1217b2da9e7db8'),
      user: mockUserListDocument[1],
      school: mockSchoolDocumentList[1],
      isDeleted: false,
      createdAt: moment().startOf('m').subtract(1, 'h').toDate(),
      updatedAt: moment().startOf('m').subtract(1, 'h').toDate(),
    },
  ],
};

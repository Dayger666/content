import {
  col,
  fn,
  where,
} from 'sequelize';
import moment from 'moment';

export const getIsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const getCorrectData = (data) => JSON.parse(JSON.stringify(data));

export const getDateInfo = (date: moment.Moment) => ({
  year: date.get('year'),
  month: date.get('month') + 1,
  day: date.get('date'),
});

export const getCustomMessageForChangePassword = (code) => `Hi! Your password reset code is ${code}`;

export const caseInsensitiveSequelizeSearch = (
  colName: string,
  value: string,
) => where(
  fn('LOWER', col(colName)),
  'LIKE',
  '%' + value.toLowerCase() + '%',
);

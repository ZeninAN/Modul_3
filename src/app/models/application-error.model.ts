export interface ApplicationError {
  code: ApplicationErrorCode
  title: string;
  description: string;
  created: Date;
}

export enum ApplicationErrorCode {
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
  NO_AUTH = 'NO_AUTH',
  WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
}

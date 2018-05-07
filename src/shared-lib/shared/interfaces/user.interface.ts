export interface IUser {
  id?: number;
  divisionId?: number;
  firstName: string;
  secondName: string;
  lastName: string;
  position: string;
  email: string;
  activeDirectoryAccount?: string;
}

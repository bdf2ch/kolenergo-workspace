import { IApplication } from '../../applications/interfaces/application.interface';
import { ICompany } from '../../companies/interfaces/company.interface';

export interface IControlPanelInitialData {
  applications: IApplication[];
  companies: ICompany[];
}


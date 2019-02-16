import { Injectable } from '@angular/core';
import { CompaniesResource } from '../resources/companies.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IServerResponse } from '../../basic/interfaces/server-response.interface';
import { Tree } from '../../basic/models/tree.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';
import { Company, Office, Department, Division, OfficeLocation } from '../models';
import {ICompany, IOffice, IFloor, IDivision, IOfficeLocation, IDepartment} from '../interfaces';
import { LocationsByFloorPipe } from '../pipes/locations-by-floor.pipe';
import {DashboardService} from '../../dashboard/services/dashboard.service';
import {ApplicationMenuItem} from '../../dashboard/models/application-menu-item.model';

@Injectable()
export class CompaniesService {
  public companies$: BehaviorSubject<Company[]>;
  public selectedCompany$: BehaviorSubject<Company>;
  public selectedDepartment$: BehaviorSubject<Department>;
  public selectedOffice$: BehaviorSubject<Office>;
  public selectedFloor$: BehaviorSubject<IFloor>;
  public selectedLocation$: BehaviorSubject<OfficeLocation>;
  public selectedDivision$: BehaviorSubject<Division>;
  public selectedCompanyDivisionTree: Tree<Division>;
  public officesDataSource: MatTableDataSource<Office>;
  public departmentsDataSource: MatTableDataSource<Department>;
  public locationsDataSource: MatTableDataSource<OfficeLocation>;
  private fetchingData$: BehaviorSubject<boolean>;
  public addingCompany$: BehaviorSubject<boolean>;
  public addingDepartment$: BehaviorSubject<boolean>;
  private addingOffice$: BehaviorSubject<boolean>;
  private addingLocation$: BehaviorSubject<boolean>;
  private addingDivision$: BehaviorSubject<boolean>;
  public editingCompany$: BehaviorSubject<boolean>;
  public editingDepartment$: BehaviorSubject<boolean>;
  private editingOffice$: BehaviorSubject<boolean>;
  private editingLocation$: BehaviorSubject<boolean>;
  private editingDivision$: BehaviorSubject<boolean>;
  public deletingCompany$: BehaviorSubject<boolean>;
  public deletingDepartment$: BehaviorSubject<boolean>;
  private deletingOffice$: BehaviorSubject<boolean>;
  private deletingLocation$: BehaviorSubject<boolean>;
  private deletingDivision$: BehaviorSubject<boolean>;

  constructor(private readonly resource: CompaniesResource,
              private readonly locationsByFloorPipe: LocationsByFloorPipe,
              private readonly dashboard: DashboardService) {
    this.companies$ = new BehaviorSubject<Company[]>([]);
    this.selectedCompany$ = new BehaviorSubject<Company>(null);
    this.selectedDepartment$ = new BehaviorSubject<Department>(null);
    this.selectedOffice$ = new BehaviorSubject<Office>(null);
    this.selectedFloor$ = new BehaviorSubject<IFloor>(null);
    this.selectedLocation$ = new BehaviorSubject<OfficeLocation>(null);
    this.selectedDivision$ = new BehaviorSubject<Division>(null);
    this.officesDataSource = new MatTableDataSource<Office>([]);
    this.departmentsDataSource = new MatTableDataSource<Department>([]);
    this.locationsDataSource = new MatTableDataSource<OfficeLocation>([]);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingCompany$ = new BehaviorSubject<boolean>(false);
    this.addingDepartment$ = new BehaviorSubject<boolean>(false);
    this.addingOffice$ = new BehaviorSubject<boolean>(false);
    this.addingLocation$ = new BehaviorSubject<boolean>(false);
    this.addingDivision$ = new BehaviorSubject<boolean>(false);
    this.editingCompany$ = new BehaviorSubject<boolean>(false);
    this.editingDepartment$ = new BehaviorSubject<boolean>(false);
    this.editingOffice$ = new BehaviorSubject<boolean>(false);
    this.editingLocation$ = new BehaviorSubject<boolean>(false);
    this.editingDivision$ = new BehaviorSubject<boolean>(false);
    this.deletingCompany$ = new BehaviorSubject<boolean>(false);
    this.deletingDepartment$ = new BehaviorSubject<boolean>(false);
    this.deletingOffice$ = new BehaviorSubject<boolean>(false);
    this.deletingLocation$ = new BehaviorSubject<boolean>(false);
    this.deletingDivision$ = new BehaviorSubject<boolean>(false);
  }

  /**
   * Получение списка приложений с сервера
   */
  fetchCompaniesList(): Observable<Company[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getAll())
      .pipe(
        map((response: IServerResponse<ICompany[]>) => {
          const result = [];
          response.data.forEach((item: ICompany) => {
            const company = new Company(item);
            company.backup.setup(['title', 'shortTitle', 'activeDirectoryUid', 'departments', 'offices']);
            result.push(company);
          });
          this.companies$.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
        })
      );
  }

  /**
   * Добавление новой организации
   * @param company - Добавляемая организация
   */
  addCompany(company: Company): Observable<Company> {
    this.addingCompany$.next(true);
    return from(this.resource.addCompany(company))
      .pipe(
        map((response: IServerResponse<ICompany>) => {
          const newCompany = new Company(response.data);
          newCompany.backup.setup(['title', 'shortTitle', 'activeDirectoryUid', 'departments', 'offices']);
          this.companies$.next(this.companies$.getValue().slice().concat([newCompany]));
          const companiesMenuItem = this.dashboard.menu.getItemById('companies');
          if (companiesMenuItem) {
            this.dashboard.menu.addItem(new ApplicationMenuItem({
              id: `company${newCompany.id}`,
              title: newCompany.shortTitle ? newCompany.shortTitle : newCompany.title,
              link: `/companies/${newCompany.id}`,
              icon: 'business',
            }), companiesMenuItem);
          }
          return newCompany;
        }),
        finalize(() => {
          this.addingCompany$.next(false);
        })
      );
  }

  /**
   * Добавление нового подразделения организации
   * @param department - Добавляемое подразделение организации
   */
  addDepartment(department: Department): Observable<Department> {
    this.addingDepartment$.next(true);
    return from(this.resource.addDepartment(department))
      .pipe(
        map((response: IServerResponse<IDepartment>) => {
          const newDepartment = new Department(response.data);
          newDepartment.backup.setup(['title', 'activeDirectoryUid']);
          this.selectedCompany$.getValue().departments.push(newDepartment);
          this.departmentsDataSource = new MatTableDataSource(this.selectedCompany$.getValue().departments);
          return newDepartment;
        }),
        finalize(() => {
          this.addingDepartment$.next(false);
        })
      );
  }

  /**
   * Добавление нового офиса организации
   * @param office - Добавляемый офис организации
   */
  addOffice(office: Office): Observable<Office> {
    this.addingOffice$.next(true);
    return from(this.resource.addOffice(office))
      .pipe(
        map((response: IServerResponse<IOffice>) => {
          const newOffice = new Office(response.data);
          newOffice.backup.setup(['title', 'address', 'floors', 'description', 'isWithLoft', 'isWithBasement']);
          this.selectedDepartment$.getValue().offices.push(newOffice);
          this.officesDataSource = new MatTableDataSource(this.selectedDepartment$.getValue().offices);
          return newOffice;
        }),
        finalize(() => {
          this.addingOffice$.next(false);
        })
      );
  }

  /**
   * Добавление нового помещения в здание организации
   * @param location - Добавляемое помещение
   */
  addLocation(location: OfficeLocation): Observable<OfficeLocation> {
    this.addingLocation$.next(true);
    return from(this.resource.addLocation(location))
      .pipe(
        map((response: IServerResponse<IOfficeLocation>) => {
          const newLocation = new OfficeLocation(response.data);
          newLocation.backup.setup(['title', 'description']);
          this.selectedOffice$.getValue().locations.push(newLocation);
          this.locationsDataSource = new MatTableDataSource<OfficeLocation>(this.locationsByFloorPipe.transform(this.selectedOffice$.getValue().locations, this.selectedFloor$.getValue()));
          return newLocation;
        }),
        finalize(() => {
          this.addingLocation$.next(false);
        })
      );
  }

  /**
   * Добавление нового структурного подразделения организации
   * @param division - Добавляемое структурное подразделение
   */
  addDivision(division: Division): Observable<Division> {
    this.addingDivision$.next(true);
    return from(this.resource.addDivision(division))
      .pipe(
        map((response: IServerResponse<IDivision>) => {
          const newDivision = new Division(response.data);
          newDivision.backup.setup(['parentId', 'title', 'order']);
          const selectedCompany = this.selectedCompany$.getValue();
          selectedCompany.divisions.push(newDivision);
          this.selectedCompany$.next(selectedCompany);
          this.selectedCompanyDivisionTree.add(newDivision);
          return newDivision;
        }),
        finalize(() => {
          this.addingDivision$.next(false);
        })
      );
  }

  /**
   * Изменение орагнизации
   * @param company - Изменяемая организация
   */
  editCompany(company: Company): Observable<Company> {
    this.editingCompany$.next(true);
    return from(this.resource.editCompany(company, null, {id: company.id}))
      .pipe(
        map((response: IServerResponse<ICompany>) => {
          company.backup.setup(['title', 'shortTitle', 'activeDirectoryUid']);
          const companyMenuItem = this.dashboard.menu.getItemById(`company${company.id}`);
          console.log('edit company menu item', companyMenuItem);
          if (companyMenuItem) {
            this.dashboard.menu.editItem(companyMenuItem);
          }
          return company;
        }),
        finalize(() => {
          this.editingCompany$.next(false);
        })
      );
  }

  /**
   * Изменение подразделения орагнизации
   * @param department - Изменяемое подразделение организации
   */
  editDepartment(department: Department): Observable<Department> {
    this.editingDepartment$.next(true);
    return from(this.resource.editDepartment(department, null, {id: department.id}))
      .pipe(
        map((response: IServerResponse<IDepartment>) => {
          department.backup.setup(['title', 'activeDirectoryUid']);
          return department;
        }),
        finalize(() => {
          this.editingDepartment$.next(false);
        })
      );
  }

  /**
   * Изменение помещения орагнизации
   * @param office - Изменяемое помещение организации
   */
  editOffice(office: Office): Observable<Office> {
    this.editingOffice$.next(true);
    return from(this.resource.editOffice(office, null, {id: office.id}))
      .pipe(
        map((response: IServerResponse<IOffice>) => {
          office.backup.setup(['departmentId', 'title', 'description', 'address', 'floors', 'isWithLoft', 'isWithBasement']);
          console.log(this.selectedDepartment$.getValue());
          this.selectedDepartment$.getValue().offices.forEach((item: Office, index: number, offices: Office[]) => {
            if (office.departmentId !== this.selectedDepartment$.getValue().id) {
              console.log('item', item, 'dep', this.selectedDepartment$.getValue().id);
              offices.splice(index, 1);
            }
          });
          if (office.departmentId !== this.selectedDepartment$.getValue().id) {
            const findDepartmentById = (item: Department) => item.id === office.departmentId;
            const department = this.selectedCompany$.getValue().departments.find(findDepartmentById);
            department.offices.push(office);
          }
          this.officesDataSource = new MatTableDataSource(this.selectedDepartment$.getValue().offices);
          return office;
        }),
        finalize(() => {
          this.editingOffice$.next(false);
        })
      );
  }

  /**
   * Изменение помещения в здании организации
   * @param office - Изменяемое помещение
   */
  editLocation(location: OfficeLocation): Observable<OfficeLocation> {
    this.editingLocation$.next(true);
    return from(this.resource.editLocation(location, null, {id: location.id}))
      .pipe(
        map((response: IServerResponse<IOfficeLocation>) => {
          location.backup.setup(['title', 'description']);
          return location;
        }),
        finalize(() => {
          this.editingLocation$.next(false);
        })
      );
  }

  /**
   * Удаление организации
   * @param company - Удаляемая организация
   */
  deleteCompany(company: Company): Observable<boolean> {
    this.deletingCompany$.next(true);
    return from(this.resource.deleteCompany(null, null, {id: company.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const companies = this.companies$.getValue();
            companies.forEach((item: Company, index: number) => {
              if (item.id === company.id) {
                companies.splice(index, 1);
                const companyMenuItem = this.dashboard.menu.getItemById(`company${company.id}`);
                if (companyMenuItem) {
                  console.log('menu item for delete found', companyMenuItem);
                  this.dashboard.menu.deleteItem(companyMenuItem);
                }
              }
            });
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingCompany$.next(false);
        })
      );
  }

  /**
   * Удаление подразделения организации
   * @param department - Удаляемое подразделение организации
   */
  deleteDepartment(department: Department): Observable<boolean> {
    this.deletingDepartment$.next(true);
    return from(this.resource.deleteDepartment(null, null, {id: department.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const departments = this.selectedCompany$.getValue().departments;
            departments.forEach((item: Department, index: number) => {
              if (item.id === department.id) {
                departments.splice(index, 1);
              }
            });
            this.departmentsDataSource = new MatTableDataSource<Department>(departments);
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingDepartment$.next(false);
        })
      );
  }

  /**
   * Удаление помещения организации
   * @param office - Удаляемое помещение организации
   */
  deleteOffice(office: Office): Observable<boolean> {
    this.deletingOffice$.next(true);
    return from(this.resource.deleteOffice(null, null, {id: office.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const offices = this.selectedDepartment$.getValue().offices;
            offices.forEach((item: Office, index: number) => {
              if (item.id === office.id) {
                offices.splice(index, 1);
              }
            });
            this.officesDataSource = new MatTableDataSource<Office>(offices);
            if (this.selectedCompany$.getValue().offices.length > 0) {
              this.selectedOffice(this.selectedCompany$.getValue().offices[0]);
            }
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingOffice$.next(false);
        })
      );
  }

  /**
   * Удаление помещения в здании организации
   * @param location - Удаляемое помещение
   */
  deleteLocation(location: OfficeLocation): Observable<boolean> {
    this.deletingLocation$.next(true);
    return from(this.resource.deleteLocation(null, null, {id: location.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const office = this.selectedOffice$.getValue();
            if (office) {
              office.locations.forEach((item: OfficeLocation, index: number) => {
                if (item.id === location.id) {
                  office.locations.splice(index, 1);
                }
              });
            }
            this.locationsDataSource = new MatTableDataSource<OfficeLocation>(this.locationsByFloorPipe.transform(this.selectedOffice$.getValue().locations, this.selectedFloor$.getValue()));
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingLocation$.next(false);
        })
      );
  }

  /**
   * Изменение структурного подразделения орагнизации
   * @param division - Изменяемое структурное подразделение
   */
  editDivision(division: Division): Observable<Division> {
    this.editingDivision$.next(true);
    return from(this.resource.editDivision(division, null, {id: division.id}))
      .pipe(
        map((response: IServerResponse<IDivision>) => {
          division.backup.setup(['parentId', 'title', 'order']);
          this.selectedCompanyDivisionTree.getById(division.id).title = division.title;
          return division;
        }),
        finalize(() => {
          this.editingDivision$.next(false);
        })
      );
  }

  /**
   * Удаление структурного подразделения организации
   * @param division - Удаляемое структурное подразделение
   */
  deleteDivision(division: Division): Observable<boolean> {
    this.deletingDivision$.next(true);
    return from(this.resource.deleteDivision(null, null, {id: division.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const treeItem = this.selectedCompanyDivisionTree.getById(division.id);
            this.selectedCompanyDivisionTree.delete(treeItem);
            this.selectedDivision$.next(null);
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingDivision$.next(false);
        })
      );
  }

  /**
   * Получение / установка текущей организации
   * @param company - Организация, устанавливаемая текущей
   */
  selectedCompany(company?: Company | null): Observable<Company> {
    if (company) {
      this.selectedDepartment$.next(null);
      this.selectedOffice$.next(null);
      this.selectedFloor$.next(null);
      this.selectedLocation$.next(null);
      this.selectedCompany$.next(company);
      // this.selectedDepartment(null);
      this.departmentsDataSource = new MatTableDataSource<Department>([]);
      // this.selectedOffice(null);
      this.officesDataSource = new MatTableDataSource<Office>([]);
      // this.selectedFloor(null);
      // this.selectedLocation(null);
      this.locationsDataSource = new MatTableDataSource<OfficeLocation>([]);
      console.log('selected office', this.selectedOffice$.getValue());
      console.log('selected company', this.selectedCompany$.getValue());
      this.departmentsDataSource = new MatTableDataSource<Department>(company.departments);
      this.selectedCompanyDivisionTree = new Tree<Division>(company.divisions, 'id', 'parentId', 'title');
      this.selectedDepartment(company.departments.length > 0 ? company.departments[0] : null);
      this.selectedDivision$.next(null);
    }
    return this.selectedCompany$.asObservable();
  }

  /**
   * Получение / установка текущего подразделения организации
   * @param department - Подразделение, устанавливаемое текущим
   */
  selectedDepartment(department?: Department | null): Observable<Department> {
    if (department) {
      this.selectedDepartment$.next(department);
      this.officesDataSource = new MatTableDataSource<Office>(department.offices);
      this.selectedOffice(department.offices.length > 0 ? department.offices[0] : null);
    }
    return this.selectedDepartment$.asObservable();
  }

  /**
   * Получение / установка текущего офиса организации
   * @param office - Офис, устанавливаемый текущим
   */
  selectedOffice(office?: Office | null): Observable<Office> {
    if (office) {
      this.selectedOffice$.next(office);
      if (office.floors_.length > 0) {
        this.selectedFloor$.next(office.floors_[0]);
        this.locationsDataSource = new MatTableDataSource<OfficeLocation>(this.locationsByFloorPipe.transform(this.selectedOffice$.getValue().locations, this.selectedFloor$.getValue()));
        this.selectedLocation(office.locations.length > 0 ? office.locations[0] : null);
      }
    }
    return this.selectedOffice$.asObservable();
  }

  /**
   * Получение / установка текущего этажа помещения
   * @param floor - Этаж помещения, устанавливаемый текущим
   */
  selectedFloor(floor?: IFloor | null): Observable<IFloor> {
    if (floor) {
      this.selectedFloor$.next(floor);
      this.locationsDataSource = new MatTableDataSource<OfficeLocation>(this.locationsByFloorPipe.transform(this.selectedOffice$.getValue().locations, floor));
    }
    return this.selectedFloor$.asObservable();
  }

  /**
   * Получение / установка текущего помещения здания
   * @param location - Этаж помещения, устанавливаемый текущим
   */
  selectedLocation(location?: OfficeLocation | null): Observable<OfficeLocation> {
    if (location) {
      this.selectedLocation$.next(location);
    } else {
      this.selectedLocation$.next(null);
    }
    return this.selectedLocation$.asObservable();
  }

  /**
   * Получение / установка текущего структурного подразделения организации
   * @param division - Структурное подразделение, устанавливаемое текущим
   */
  selectedDivision(division?: Division | null): Observable<Division> {
    if (division) {
      this.selectedDivision$.next(division);
    }
    return this.selectedDivision$.asObservable();
  }

  getCompanyById(id: number): Company | null {
    const findCompanyById = (company: Company) => company.id === id;
    const result = this.companies$.getValue().find(findCompanyById);
    return result ? result : null;
  }


  getOffices(): Office[] {
    const result = [];
    if (this.selectedCompany$.getValue() && this.selectedDepartment$.getValue()) {
      this.selectedCompany$.getValue().offices.forEach((office: Office) => {
        if (office.departmentId === this.selectedDepartment$.getValue().id) {
          result.push(office);
        }
      });
    }
    return result;
  }

  /**
   * Отбор помещений здания организации
   */
  getLocations(): OfficeLocation[] {
    const result = [];
    if (this.selectedOffice$.getValue()) {
      this.selectedOffice$.getValue().locations.forEach((location: OfficeLocation) => {
        if (location.officeId === this.selectedOffice$.getValue().id && location.floor === this.selectedFloor$.getValue().number) {
          result.push(location);
        }
      });
    }
    return result;
  }

  /**
   * Выполняется ли добавление нового офиса организации
   */
  isAddingOffice(): Observable<boolean> {
    return this.addingOffice$.asObservable();
  }

  /**
   * Выполняется ли добавление нового помещения здания организации
   */
  isAddingLocation(): Observable<boolean> {
    return this.addingLocation$.asObservable();
  }

  /**
   * Выполняется ли добавление нового структурного подразделения организации
   */
  isAddingDivision(): Observable<boolean> {
    return this.addingDivision$.asObservable();
  }

  /**
   * Выполняется ли изменение помещения организации
   */
  isEditingOffice(): Observable<boolean> {
    return this.editingOffice$.asObservable();
  }

  /**
   * Выполняется ли изменение помещения здания организации
   */
  isEditingLocation(): Observable<boolean> {
    return this.editingLocation$.asObservable();
  }

  /**
   * Выполняется ли изменение структурного подразделения организации
   */
  isEditingDivision(): Observable<boolean> {
    return this.editingDivision$.asObservable();
  }

  /**
   * Выполняется ли удаление помещения организации
   */
  isDeletingOffice(): Observable<boolean> {
    return this.deletingOffice$.asObservable();
  }

  /**
   * Выполняется ли удаление помещения здания организации
   */
  isDeletingLocation(): Observable<boolean> {
    return this.deletingLocation$.asObservable();
  }

  /**
   * Выполняется ли удаление структурного подразделения организации
   */
  isDeletingDivision(): Observable<boolean> {
    return this.deletingDivision$.asObservable();
  }
}

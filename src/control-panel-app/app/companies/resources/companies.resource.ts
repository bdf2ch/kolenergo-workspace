import { Injectable } from '@angular/core';
import {
  IResourceMethod,
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';
import { ICompany } from '../../companies/interfaces/company.interface';
import { IOffice } from '../../companies/interfaces/office.interface';
import { IDivision } from '../../companies/interfaces/division.interface';
import { IServerResponse } from '../../basic/interfaces/server-response.interface';
import { environment } from '../../../../_common/environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'cp/companies'
})
export class CompaniesResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAll: IResourceMethod<void, IServerResponse<ICompany[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addCompany: IResourceMethod<ICompany, IServerResponse<ICompany>>;

  @ResourceAction({
    path: '/offices',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addOffice: IResourceMethod<IOffice, IServerResponse<IOffice>>;

  @ResourceAction({
    path: '/divisions',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addDivision: IResourceMethod<IDivision, IServerResponse<IDivision>>;

  @ResourceAction({
    path: '/divisions/{:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editDivision: IResourceMethodStrict<IDivision, void, {id: number}, IServerResponse<IDivision>>;

  @ResourceAction({
    path: '/divisions/{:id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteDivision: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;


  /*
  @ResourceAction({
    path: '/roles/{:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editRole: IResourceMethodStrict<IRole, void, {id: number}, IServerResponse<IRole>>;

  @ResourceAction({
    path: '/permissions',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addPermission: IResourceMethod<IPermission, IServerResponse<IPermission>>;

  @ResourceAction({
    path: '/permissions/{:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editPermission: IResourceMethodStrict<IPermission, void, {id: number}, IServerResponse<IPermission>>;
  */
}

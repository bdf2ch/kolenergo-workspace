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
import { environment } from '../../../../_common/environments/environment';
import { ICompany, IPermission, IRole, IServerResponse } from '@kolenergo/lib';
import {IOperativeSituationReport, IOperativeSituationReportsInitialData, OperativeSituationReport} from '@kolenergo/osr';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'osr'
})
export class OperativeSituationResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/init',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<{companyId: number}, IServerResponse<IOperativeSituationReportsInitialData>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getReports: IResourceMethod<{companyId: number}, IServerResponse<IOperativeSituationReport[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addReport: IResourceMethod<OperativeSituationReport, IServerResponse<IOperativeSituationReport>>;

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
}

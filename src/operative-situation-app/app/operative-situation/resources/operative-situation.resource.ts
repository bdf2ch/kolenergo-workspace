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
import { IServerResponse } from '@kolenergo/lib';
import { IOperativeSituationReport, IOperativeSituationReportsInitialData, OperativeSituationReport } from '@kolenergo/osr';

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
    path: '/',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editReport: IResourceMethod<OperativeSituationReport, IServerResponse<IOperativeSituationReport>>;
}
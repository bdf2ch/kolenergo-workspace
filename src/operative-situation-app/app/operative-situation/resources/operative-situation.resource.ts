import { Injectable } from '@angular/core';
import {
  IResourceMethod,
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod, ResourceResponseBodyType
} from "@ngx-resource/core";
import { environment } from '../../../../_common/environments/environment';
import { IServerResponse } from '@kolenergo/cpa';
import { IOperativeSituationReport, IOperativeSituationReportsInitialData, OperativeSituationReport } from '@kolenergo/osr';
import { OperativeSituationConsumption } from '../models/operative-situation-consumption.model';
import { IOperativeSituationConsumption } from '../interfaces/operative-situation-consumption.interface';

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
  getReports: IResourceMethod<{companyId: number}, IServerResponse<IOperativeSituationReportsInitialData>>;

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

  @ResourceAction({
    path: '/consumption',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addConsumption: IResourceMethod<OperativeSituationConsumption, IServerResponse<IOperativeSituationConsumption>>;

  @ResourceAction({
    path: '/consumption',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editConsumption: IResourceMethod<OperativeSituationConsumption, IServerResponse<IOperativeSituationConsumption>>;

  @ResourceAction({
    path: '/export',
    method: ResourceRequestMethod.Get,
    withCredentials: true,
    responseBodyType: ResourceResponseBodyType.Blob
  })
  exportReport: IResourceMethodStrict<void, {date: string, period: string}, void, Blob>;
}

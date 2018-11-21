import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { IControlPanelInitData } from '../interfaces/control-panel-init-data.interface';
import { DashboardService } from '../services/dashboard.service';
import { IServerResponse } from '@kolenergo/lib';

@Injectable()
export class InitDataResolveGuard implements Resolve<IServerResponse<IControlPanelInitData>> {
  constructor(private readonly dashboard: DashboardService) {
    console.log('APP INIT DATA GUARD');
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IServerResponse<IControlPanelInitData>> {
    const data = await this.dashboard.fetchInitialData().toPromise();
    return data;
  }
}

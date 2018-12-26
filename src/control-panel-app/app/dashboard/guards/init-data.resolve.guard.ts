import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { IControlPanelInitialData } from '../interfaces/control-panel.init.interface';
import { DashboardService } from '../services/dashboard.service';
import { IServerResponse } from '../../common/interfaces/server-response.interface';

@Injectable()
export class InitDataResolveGuard implements Resolve<IServerResponse<IControlPanelInitialData>> {
  constructor(private readonly dashboard: DashboardService) {
    console.log('APP INIT DATA GUARD');
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IServerResponse<IControlPanelInitialData>> {
    const data = await this.dashboard.fetchInitialData().toPromise();
    return data;
  }
}

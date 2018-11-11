import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { ApplicationsService } from '../services/applications.service';
import { Application } from '../models/application.model';

@Injectable()
export class ApplicationsResolveGuard implements Resolve<Application[]> {
  constructor(private readonly applications: ApplicationsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Application[]> {
    const applications = await this.applications.fetchApplicationsList().toPromise();
    return applications;
  }
}

import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Department } from '../../models';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {
  public departmentsDataSource: MatTableDataSource<Department>;
  public departmentsDisplayColumns: string[];

  constructor(private readonly route: ActivatedRoute,
              public readonly companies: CompaniesService) {
    this.departmentsDataSource = new MatTableDataSource<Department>([]);
    this.departmentsDisplayColumns = ['title', 'controls'];
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        const company = this.companies.getCompanyById(Number(data['id']));
        if (company) {
          this.companies.selectedCompany(company);
          this.departmentsDataSource = new MatTableDataSource<Department>(company.departments);
        }
      }
    });
  }

  ngOnInit() {}

}

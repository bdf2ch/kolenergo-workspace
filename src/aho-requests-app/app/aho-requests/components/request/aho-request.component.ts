import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './aho-request.component.html',
  styleUrls: ['./aho-request.component.less']
})
export class AhoRequestComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialogRef: MatDialogRef<AhoRequestComponent>,
              public readonly ahoRequestsService: AhoRequestsService) {}

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['']);
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.ahoRequestsService.setSelectedRequest(null);
    });
  }

  editRequest() {}

}

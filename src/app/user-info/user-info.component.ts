import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubService } from '../common/git-hub.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userName;
  repoInfo;
  showLoader = false;
  constructor(public activatedRoute: ActivatedRoute,
    public gitHubService: GitHubService) { }

  ngOnInit() {
    this.userName = this.activatedRoute.params.subscribe(
      params => {
        this.userName = params['name'];
        if (this.userName) {
          this.getUserDetails();
        }
      });
  }

  getUserDetails() {
    this.repoInfo = [];
    this.showLoader = true;
    this.gitHubService.getUsersRepositoryInfo(this.userName).subscribe(
      data => {
        this.showLoader = false;
        console.log('data', data);
        this.repoInfo = data
      },
      error => { alert(error); this.showLoader = false; }
    );
  }
}

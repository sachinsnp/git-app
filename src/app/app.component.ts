import { Component, OnInit } from '@angular/core';
import { GitHubService } from './common/git-hub.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  since = 0;
  perPage = 10;
  userList;
  userName;
  constructor(public gitHubService: GitHubService, public router: Router) { }
  ngOnInit() {
    this.getUserList();
  } 

  getUserList(limit?) {
    if (limit == 'next') {
      this.since += 10;
    } else if (limit == 'previous') {
      this.since -= 10;
    }
    let param = { userName: this.userName, since: this.since, perPage: this.perPage };
    this.gitHubService.getGitHubUsers(param).subscribe(
      (data: any) => {
        console.log('data', data);
        if (data.length > 0) {
          this.userList = data
        } else {
          this.userList = [data];
        }
        this.router.navigate(['user-info']);
      },
      error => alert(error)
    );
  }
}

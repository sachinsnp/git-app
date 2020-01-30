import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class GitHubService {
    baseUrl = 'https://api.github.com/';
    header = new HttpHeaders({
    });

    constructor(public httpClient: HttpClient) { }

    getGitHubUsers(params) {
        let url = this.baseUrl + 'users' + (params.userName ? '/' + params.userName : '') + '?since=' + params.since + '&per_page=' + params.perPage;
        return this.httpClient.get(url, params);
    }

    getUsersRepositoryInfo(userName) {
        let url = this.baseUrl + 'users/' + userName + '/repos';
        return this.httpClient.get(url);
    }
}

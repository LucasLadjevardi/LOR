import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  DownloadLauncher(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../favicon.ico');
    link.setAttribute('download', `TestDownload.ico`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}

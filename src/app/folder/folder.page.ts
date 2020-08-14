import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  rainStatus: string;
  command: string;

  ngOnInit() {
    this.rainStatus = 'Będzie padać.';
    this.command = 'Weź parasol';
  }

}

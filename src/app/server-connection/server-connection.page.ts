import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerClientService } from '../services/server-client.service';

import { Socket, SocketIoConfig } from 'ngx-socket-io';



@Component({
  selector: 'app-server-connection',
  templateUrl: './server-connection.page.html',
  styleUrls: ['./server-connection.page.scss'],
  standalone : false
})
export class ServerConnectionPage implements OnInit {

  serverDataForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private router : Router, private serverClient : ServerClientService) { 

    this.serverDataForm = this.formBuilder.group(
      {
        ipAddress: ['', [Validators.required]],
        portNumber:['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
  }

  connectServer(){
    console.log(this.serverDataForm.value);
    this.serverClient.checkConnection(this.serverDataForm.value).subscribe(dataResponse => {
      console.log(dataResponse);
      
      let config:SocketIoConfig = {
        url: this.serverClient.baseURL,
        options: {},
      };
      let socket:Socket = new Socket(config);
      //this.serverClient.socketConfig = config;
      this.serverClient.setSocket(socket);
      console.log(this.serverClient);
      this.router.navigate(['/home']);
    });
  }

}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerClientService {

  portNumber:string = '';
  ipAddress:string = '';
  public baseURL:string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Content-Type-Options': '*'
    })
  };

  public socketConfig : any;

  message : any;
  public socket : any;

  constructor(private http : HttpClient) { 

    console.log("server client service constructor");
    //this.socket = new Socket(this.socketConfig);
    //this.message = this.socket.fromEvent('message');
  }

  checkConnection(dataServer:any):Observable <any>{
    console.log('setConnection');
    this.baseURL = `http://${dataServer.ipAddress}:${dataServer.portNumber}`;
    //this.socketConfig.url = this.baseURL;
    //console.log(this.baseURL)
    return this.http.get<any>(this.baseURL)
                .pipe(
                  catchError(this.handleError)
                );
  }

  private handleError(error : HttpErrorResponse){
    console.log('handleError');

    return throwError(() => new Error('Something went wrong; please try later.'))
  }

  connectSocket(){
    //this.socketConfig.url = this.baseURL;
    //this.socket.disconnect();
    //this.socketConfig.url = this.baseURL;
    this.socket = new Socket(this.socketConfig);
    return this.socket;
  }

  setSocket(socket:any){
    this.socket = socket;
    this.message = this.socket.fromEvent('message');
    console.log(this.message);
  }

  getSocketMessage(){
    return this.socket.fromEvent('message').pipe(map((data:any) => data.msg));
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}

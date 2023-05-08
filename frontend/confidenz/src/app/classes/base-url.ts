import { HttpHeaders } from '@angular/common/http';

const httpOptions = {

    headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        })
    };

const httpOptions2 = {
    headers:new HttpHeaders(
        {
            'Content-Type': 'application/JSON',
        })
    }     
    


export class BaseUrl {
    url = "http://localhost:3000/";
    
    httpOptions = httpOptions;
    httOptionsPost = httpOptions2;
    
}

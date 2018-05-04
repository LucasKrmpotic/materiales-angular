import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SpotifyService {

  urlSpotify = 'https://api.spotify.com/v1/';

  artistas: any[] = [];
  artista: any = {};

  constructor( public http: HttpClient ) { console.log('Servicio de spotify listo'); }

  getHeaders (): HttpHeaders {

    const headers = new HttpHeaders({
      'authorization': 'Bearer BQCZRERElaGbBwdRrzSJd1WZSAWm1hxbECRRJrZDoZPq1WvRRIVUpP8rQeoiC32_-TZ82dI_qvn3xqO0g0I'
    });

    return headers;
  }
  getTopTracks( id: string ) {
    let url =  	`${ this.urlSpotify }artists/${ id }/top-tracks?country=US`;

    const headers = this.getHeaders();

    return this.http.get(url, { headers })
      .map( ( res: any ) => {
        return res.tracks;
      });
  }

  getArtista ( id: string ) {

    let url = `${ this.urlSpotify }artists/${ id }`;

    const headers = this.getHeaders();

    return this.http.get(url, { headers })
                .map( ( res: any ) => {
                  this.artista = res;
                  return this.artista;
                });
  }

  getArtistas ( termino: string) {

    const url = `${ this.urlSpotify }search?query=${ termino }&type=artist&offset=0&limit=20`;

    const headers = this.getHeaders();

    return this.http.get(url, { headers })
               .map( ( res: any ) => {
                 this.artistas = res.artists.items;
                  return this.artistas;
               });
  }

}

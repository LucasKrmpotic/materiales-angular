import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];

  constructor( private _activatedRoute: ActivatedRoute,
               public _spotifyService: SpotifyService) { }

  ngOnInit() {

    this._activatedRoute.params
          .map( params => params['id'])
          .subscribe( id => {

            this._spotifyService.getArtista( id ).subscribe( artista => {
              console.log( artista );
              this.artista = artista;
            });

            this._spotifyService.getTopTracks( id ).subscribe( topTracks => {
              this.topTracks = topTracks;
              console.log( topTracks );
            });
          });
  }

}

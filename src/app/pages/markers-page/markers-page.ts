import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import {v4 as UUID} from "uuid";
import { JsonPipe } from '@angular/common';

 mapboxgl.accessToken = environment.mapbox;


interface Marker{
  id:string;
  mapboxMarker:mapboxgl.Marker;
}


@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css',
})
export class MarkersPage  implements AfterViewInit{

  divElement = viewChild<ElementRef>("mapa");
  map = signal<mapboxgl.Map|null>(null);
  markers = signal<Marker[]>([]);


  ngAfterViewInit(): void {
     if (!this.divElement()?.nativeElement) return;


    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.1862, 11.2293], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    this.mapListeners(map);


  }


  mapListeners(map:mapboxgl.Map){

    map.on("click",(event)=>{this.mapClick(event)})
    this.map.set(map);

  }


  mapClick(event:mapboxgl.MapMouseEvent){
    if(!this.map()) return;

    const mapa = this.map()!;
      const color = "#xxxxxx".replace(/x/g,(y)=>((Math.random()
      *16)|0).toString(16));

    const coords = event.lngLat;
    const mapboxMarker = new mapboxgl.Marker({
      color:color
    }).setLngLat(coords).addTo(mapa);

    const newMarker:Marker={
      id:UUID(),
      mapboxMarker:mapboxMarker
    }
    this.markers.set([newMarker,...this.markers()])

  }

  flyToMarker(lngLat:LngLatLike){
    if(!this.map()) return;

    this.map()?.flyTo({
      center:lngLat
    })
  }

  deleteMarker(marker:Marker){
    if(!this.map()) return;

    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter(m => m.id!==marker.id));
  }
}

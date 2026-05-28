import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from "mapbox-gl";
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapbox;


@Component({
  selector: 'app-minimap-component',
  imports: [],
  templateUrl: './minimap-component.html',
  styleUrl: './minimap-component.css',
})
export class MinimapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>("map");
  lngLat = input.required<{lng:number,lat:number}>();
  zoom = input<number>(14);
  map = signal<mapboxgl.Map|null>(null);

  ngAfterViewInit(): void {
    if (!this.divElement()?.nativeElement) return;


    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: 14,
      interactive:false // starting zoom
    });


    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }

}

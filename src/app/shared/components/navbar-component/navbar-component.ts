import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, map} from 'rxjs';

@Component({
  selector: 'navbar-component',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {

router = inject(Router);

  routess = routes.map(route =>({
  path:route.path,
  title:`${route.title ?? "Maps en Angular"} `
})).filter(route => route.path !== "**");

pageTitle$ = this.router.events.pipe(
  filter(event => event instanceof NavigationEnd),
  map(event => event.url),
  map(url => this.routess.find((route)=>`/${route.path}` === url)?.title ?? "Mapas")
)



}

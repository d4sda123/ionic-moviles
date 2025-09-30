import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonFooter, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonFooter,
    IonButtons,
    IonButton,
    RouterLink,
  ],
})
export class AppComponent {
  menuDisabled = false;
  private authPaths = ['/login', '/registro'];

  constructor(private router: Router) {
    // Disable menu on auth pages
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.menuDisabled = this.authPaths.some((p) => e.urlAfterRedirects.startsWith(p));
      });
  }

  logout() {
    try {
      localStorage.removeItem('auth');
    } catch {}
    this.router.navigateByUrl('/login');
  }
}

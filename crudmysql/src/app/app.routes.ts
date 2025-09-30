import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadComponent: () => import('./clientes/clientes.page').then(m => m.ClientesPage),
    canActivate: [authGuard]
  },
  {
    path: 'agregar',
    loadComponent: () => import('./agregar/agregar.page').then(m => m.AgregarPage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'productos',
    loadComponent: () => import('./productos/productos.page').then(m => m.ProductosPage),
    canActivate: [authGuard]
  },

];

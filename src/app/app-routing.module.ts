import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule)},
  {path: 'entradas', loadChildren: () => import('./features/entradas/entradas.module').then(m => m.EntradasModule)}
/** Lazy loading modules, só é carregado quando a rota é chamada, então os modulos são carregados  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

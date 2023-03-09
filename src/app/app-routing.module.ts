import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: MainContainerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'cities'
    },
    {
      path: 'cities',
      loadChildren: () => import('./pages/city-list/city-list.module').then(m => m.CityListModule)
    }
  ],
}, {
  path: '**', component: NotFoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

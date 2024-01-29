import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetflixContentComponent } from './pages/netflix-content/netflix-content.component';
import { BajoNivelComponent } from './pages/bajo-nivel/bajo-nivel.component';
import { NivelMedioComponent } from './pages/nivel-medio/nivel-medio.component';
import { NivelAltoComponent } from './pages/nivel-alto/nivel-alto.component';

const routes: Routes = [
  {
    path: '',
    component:  NetflixContentComponent
  },
  {
    path:'nivel-bajo',
    component: BajoNivelComponent
  },
  {
    path: 'nivel-medio',
    component: NivelMedioComponent
  },
  {
    path: 'nivel-alto',
    component: NivelAltoComponent
  },
  {
    path:'**',
    redirectTo : ''
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

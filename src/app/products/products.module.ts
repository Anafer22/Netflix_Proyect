import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { NetflixContentComponent } from './pages/netflix-content/netflix-content.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { BajoNivelComponent } from './pages/bajo-nivel/bajo-nivel.component';
import { NivelMedioComponent } from './pages/nivel-medio/nivel-medio.component';
import { NivelAltoComponent } from './pages/nivel-alto/nivel-alto.component';



@NgModule({
  declarations: [
    NetflixContentComponent,
    ProductsTableComponent,
    BajoNivelComponent,
    NivelMedioComponent,
    NivelAltoComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
  ]
})
export class ProductsModule { }

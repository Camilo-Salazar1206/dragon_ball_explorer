import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { RouterModule } from '@angular/router';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    HeaderComponent,
    SkeletonLoaderComponent,
    CharacterDetailsComponent

  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([])
  ],
  exports:[
    HeaderComponent,
    SkeletonLoaderComponent,
    CharacterDetailsComponent
  ]
})
export class SharedModule { }

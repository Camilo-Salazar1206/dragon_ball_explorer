import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defaultValues } from 'src/app/pages/home/enums/enums';
import { IFCharacters, Item } from 'src/app/pages/home/models/home.models';
import { HomeService } from 'src/app/pages/home/services/home-service.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: Item | null = null; // Tipo de dato correcto para almacenar el personaje
  filteredCharacters: IFCharacters | null = defaultValues.NULL;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    console.log("Nombre del parámetro de la URL:", name);

    this.homeService.getCharacterByName(name).subscribe((data:any) => {
      if (data && data.length > 0) {
        this.character = data[0];
        console.log('Personaje obtenido:', this.character);
      } else {
        this.character = null;
      }
    });
  }
}

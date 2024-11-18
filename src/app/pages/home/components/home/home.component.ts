import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';
import { IFCharacters } from '../../models/home.models';
import {
  defaultValues,
  LoadingDelay,
  NumberRange,
  Pages,
} from '../../enums/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  characters: IFCharacters | null = defaultValues.NULL;
  filteredCharacters: IFCharacters | null = defaultValues.NULL;
  errorMessage: string | null = defaultValues.NULL;
  currentPage: number = Pages.INITIAL_PAGE;
  itemsPerPage: number = Pages.ITEMS_LIMIT;
  loading: boolean = defaultValues.FALSE;
  details: boolean = defaultValues.FALSE;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadCharacters(this.itemsPerPage);
  }

  loadCharacters(limit: number): void {
    this.loading = defaultValues.TRUE;
    this.homeService.getAllCharacters(limit).subscribe((data: IFCharacters) => {
      this.characters = data;
      console.log(data.items);
      setTimeout(() => {
        this.loading = defaultValues.FALSE;
      }, LoadingDelay.SHORT);
      console.log(this.characters);
    });
  }

  onSearch(name: string): void {
    this.loading = defaultValues.TRUE;
    if (!name.trim()) {
      this.filteredCharacters = defaultValues.NULL;
      this.loadCharacters(this.itemsPerPage);
      return;
    }

    this.homeService.getCharacterByName(name).subscribe((data: any) => {
      this.filteredCharacters = { items: data };
      console.log(this.filteredCharacters.items);
      setTimeout(() => {
        this.loading = defaultValues.FALSE;
      }, LoadingDelay.SHORT);
    });
  }


  onChangePage(): void {
    this.loading = defaultValues.TRUE;
    this.homeService
      .getCharactersByPage(this.currentPage, this.itemsPerPage)
      .subscribe((data: IFCharacters) => {
        this.characters = data;
        setTimeout(() => {
          this.loading = defaultValues.FALSE;
        }, LoadingDelay.SHORT);
        console.log(this.characters);
      });
  }

  onPageChange(page: number): void {
    if (
      this.characters?.meta &&
      page >= Pages.INITIAL_PAGE &&
      page <= this.characters.meta.totalPages
    ) {
      this.currentPage = page;
      this.filteredCharacters = defaultValues.NULL;
      this.onChangePage();
    }
  }

  getPageNumbers(): number[] {
    if (!this.characters?.meta) return [];

    const totalPages = this.characters.meta.totalPages;
    const currentPage = this.currentPage;
    const pages: number[] = [];

    const startPage = Math.max(
      NumberRange.ZERO + NumberRange.ONE,
      currentPage - NumberRange.TWO
    );
    const endPage = Math.min(totalPages, currentPage + NumberRange.TWO);

    if (startPage > NumberRange.ZERO + NumberRange.ONE) {
      pages.push(NumberRange.ZERO + NumberRange.ONE);
      if (startPage > NumberRange.ZERO + NumberRange.TWO)
        pages.push(NumberRange.NEGATIVE_ONE);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - NumberRange.ONE)
        pages.push(NumberRange.NEGATIVE_ONE);
      pages.push(totalPages);
    }

    return pages;
  }
}

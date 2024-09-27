import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchBoxComponent {

  constructor( private gifsService : GifsService ){

  }

  @ViewChild('txtTagImput')
  tagImput!: ElementRef<HTMLInputElement>

  searchTag(){
    const newTag = this.tagImput.nativeElement.value;
    this.gifsService.searchTag(newTag)
    this.tagImput.nativeElement.value = '';
  }
}

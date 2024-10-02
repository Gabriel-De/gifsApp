import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {


  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    // si no viene la URL
    if (!this.url) throw new Error('URL no propetry is required')
  }

  onLoad(){
      this.hasLoaded = true;
  }
}

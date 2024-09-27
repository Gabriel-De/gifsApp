import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearcheResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory : string[] = [];
  private apiKey :       string = 'eMGoSH9MKjlBiJvtNWuJqwn2fOs3AilT'
  private serviceUrl :   string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistroy(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStrorage();
  }

  private saveLocalStrorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void{
    //si no tenemos data hacemos el return
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //recargar los gifs al cargar la pagina con el primero de la lista
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearcheResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp=>{
        this.gifList = resp.data;
      })
  }

}

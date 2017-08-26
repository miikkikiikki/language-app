import { Component } from '@angular/core';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import {FormControl} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
    selector: 'my-home',
    templateUrl: `app/components/home/home.component.html`
})
export class HomeComponent {
    events: string[] = [];
    model: string;
    word: FormControl = new FormControl("");
    listWords : Array<any> = [];
    listTranslate = [];
    gapi:any;
    results: string[];
    public pass: string = "trnsl.1.1.20170729T174253Z.d7a3c7e8d4415ddb.e33c0b0e867eae4e5d49f5cf93d905f9df3b346c"
    public q: string = "world";
    public req: string =  "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=ru&key="+this.pass+"&text=";


    constructor(private http:Http){
    };

    createWorld(world) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.req+world, "hello", options).map(
            result => {
                let data = result.json();
                return data
            }
        ).subscribe(
            data => this.formatResult(data));
    };

    formatResult(result) {
        var d = result.text[0];
        console.log(d);
        this.listWords.push(d);
    }

    beforeChange(data: boolean) {
        this.events = [...this.events, "beforeChange"];
    }

    onChange(data) {
        this.events = [...this.events, "onChange"];
    }

    addNewWord(newWord: string) {
        if(newWord){
            this.listWords.push(newWord);
            console.log(this.listWords);
            this.word.reset();
            this.createWorld(newWord);
            console.log(this.results);

        }
    }
}
import * as mongoose from 'mongoose';

export function filterRestaurants(arrRestaurants: mongoose.Document[], filterName: string) {
    return arrRestaurants.map((element) => {
        const firstHalf: string = (<any>element).name.slice(0, (<any>element).name.length / 2); 

        if(filterName.length > ((<any>element).name.length / 2) || !firstHalf.includes(filterName)) {
            (<any>element) = null;
            return; 
        } else {
            return element;
        }
    }).filter(elem => elem != null);
}
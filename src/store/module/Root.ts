import { makeAutoObservable } from "mobx";
export class RootStore {
    count = 0;
    constructor() {
        makeAutoObservable( this );
    }

    add_count = () => {
        this.count++;
    };

    minus_count = () => {
        this.count--;
    };

}

export default new RootStore();
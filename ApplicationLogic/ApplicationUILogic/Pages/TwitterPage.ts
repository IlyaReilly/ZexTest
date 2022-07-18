import {BasePage} from './BasePage';

const pageLocator: string = '.w-full >> text=Your website results';

export class TwitterPage extends BasePage {
    readonly searchTextBox;

    TextBox = {
        following_count: this.page.locator('text=following >> span >> nth=0'),
    };

    constructor(page, locator = pageLocator){
        super(page, locator);
    }
}
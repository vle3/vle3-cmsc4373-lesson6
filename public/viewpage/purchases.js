import { MENU, root } from './elements.js';
import { ROUTE_PATHNAMES } from '../controller/route.js';
import * as Util from './util.js';

export function addEventListeners() {
    MENU.Purchases.addEventListener('click' , async () => {
        history.pushState(null, null,  ROUTE_PATHNAMES.PURCHASES);
        const label = Util.disabledButton(MENU.Purchases);
        await purchases_page();
        Util.enabledButton(MENU.Purchases, label);
    });
}

export async function purchases_page() {
    root.innerHTML = '<h1>Purchases Page</h1>'
}
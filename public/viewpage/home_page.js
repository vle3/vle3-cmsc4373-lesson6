import { MENU, root } from './elements.js';
import { ROUTE_PATHNAMES } from '../controller/route.js';
import * as Util from './util.js';
import { getProductList } from '../controller/firestore_controller.js';
import { DEV } from '../model/constants.js';
import { currentUser } from '../controller/firebase_auth.js';
import { cart } from './cart_page.js';

export function addEventListeners() {
    MENU.Home.addEventListener('click', async () => {
        history.pushState(null, null, ROUTE_PATHNAMES.HOME);
        const label = Util.disabledButton(MENU.Home);
        await home_page();
        Util.enabledButton(MENU.Home, label);
    });
}

export async function home_page() {

    let html = '<h1>Enjoy Shopping!</h1>';

    let products;
    try {
        products = await getProductList();
        if (cart && cart.getTotalQty() != 0) {
            cart.items.forEach( item => {
                const p = products.find(e => e.docId == item.docId);
                if(p) p.qty = item.qty;
            });
        }
    } catch (e) {
        if (DEV) console.log(e);
        Util.info('Failed to get product list', JSON.stringify(e));
    }

    for (let i = 0; i < products.length; i++) {
        html += buildProductView(products[i], i);
    }

    root.innerHTML = html;

    const productForms = document.getElementsByClassName('form-product-qty');
    for (let i = 0; i < productForms.length; i++) {
        productForms[i].addEventListener('submit', e => {
            e.preventDefault();
            const p = products[e.target.index.value];
            const submitter = e.target.submitter;
            if (submitter == 'DEC') {
                cart.removeItem(p);
                if (p.qty > 0) --p.qty;
            } else if (submitter == 'INC') {
                cart.addItem(p);
                p.qty = p.qty == null ? 1 : p.qty + 1;
            } else {
                if (DEV) console.log(e);
                return;
            }
            const updateQty = (p.qty == null || p.qty == 0) ? 'Add' : p.qty;
            document.getElementById(`item-count-${p.docId}`).innerHTML = updateQty;
            MENU.CartItemCount.innerHTML = `${cart.getTotalQty()}`;
        });
    }
}

function buildProductView(product, index) {
    return `
    <div class="card" style="width: 18rem; display: inline-block;">
        <img src="${product.imageURL}" class="card-img-top" >
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">
                ${Util.currency(product.price)} <br>
                ${product.summary}
            </p>
            <div class="container pt-3 bg-light ${currentUser ? 'd-block' : 'd-none'}">
                <form method="post" class="form-product-qty">
                    <input type="hidden" name="index" value="${index}">
                    <button class="btn btn-outline-danger" type="submit" 
                                onclick="this.form.submitter='DEC'"> &minus;</button>
                    <div id="item-count-${product.docId}" 
                        class="container rounded text-center text-white bg-primary d-inline-block w-50">
                        ${product.qty == null || product.qty == 0 ? 'Add' : product.qty}                    
                    </div>
                    <button class="btn btn-outline-danger" type="submit" 
                                onclick="this.form.submitter='INC'"> &plus;</button>
                </form>
            </div>
        </div>
    </div>
    `;
}
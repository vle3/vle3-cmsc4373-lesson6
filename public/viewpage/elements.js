export const MENU = {
    SignIn: document.getElementById('menu-signin'),
    Home: document.getElementById('menu-home'),
    Purchases: document.getElementById('menu-purchases'),
    SignOut: document.getElementById('menu-signout'),
    Cart: document.getElementById('menu-cart'),
    Profile: document.getElementById('menu-profile'),
}

export const formSignIn = document.getElementById('form-signin');

export const modalInfobox = {
    modal: new bootstrap.Modal(document.getElementById('modal-infobox'), { backdrop: 'static' }),
    title: document.getElementById('modal-infobox-title'),
    body: document.getElementById('modal-infobox-body'),
}

//modal
export const modalSignin = new bootstrap.Modal(document.getElementById('modal-signin'), { backdrop: 'static' });

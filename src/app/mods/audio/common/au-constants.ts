import { AudioState, Category, Customer, NavButtonConfig, Order, PaymentMethod, Product } from "./au-interfaces";

export const NAV_BUTTONS: NavButtonConfig[] = [
    {text: 'home', link: 'home'},
    {text: 'headphones', link: 'headphones'},
    {text: 'speakers', link: 'speakers'},
    {text: 'earphones', link: 'earphones'},
];

export const CATEGORIES: Category [] = [
    {name: 'headphones', displayName: 'headphones', image: '../../../../../assets/audio/shared/desktop/image-category-thumbnail-headphones.png'},
    {name: 'speakers', displayName: 'speakers', image: '../../../../../assets/audio/shared/desktop/image-category-thumbnail-speakers.png'},
    {name: 'earphones', displayName: 'earphones', image: '../../../../../assets/audio/shared/desktop/image-category-thumbnail-earphones.png'},
];

export const PRODUCT_INITIALIZER: Product = {
    id: 0,
    slug: '',
    name: '',
    image: {},
    category: '',
    categoryImage: {},
    new: false,
    price: 0,
    description: '',
    features: '',
    includes: [],
    gallery: {},
    others: [],

}

export const BANNER_TEXT = 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.';

export const HOME_FEATURE_TEXT = 'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.';

export const ABOUT_SECTION_HEADLINE = 'Bringing you the best audio gear';

export const ABOUT_SECTION_TEXT = ` Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
rooms available for you to browse and experience a wide range of our products. Stop by our store 
to meet some of the fantastic people who make Audiophile the best place to buy your portable 
audio equipment.`;

export const FOOTER_TEXT = `Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
visit our demo facility - we’re open 7 days a week.`;

export const FOOTER_COPYRIGHT = `copyright 2023.  all rights reserved`;

export const CUSTOMER_INITIALIZER: Customer = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    paymentMethod: PaymentMethod.COD,
    eMoneyNumber: '',
    eMoneyPin: '',
  }

  export const ORDER_INITIALIZER: Order = {
    customer: CUSTOMER_INITIALIZER,
    products: [],
    totalCost: 0,
    shippingCost: 0,
    vatCost: 0,
    grandTotal: 0,
    totalItemsCount: 0,
    orderDate: new Date(),
  }

  export const AUDIO_STATE_INITIALIZER: AudioState = {
    customer: CUSTOMER_INITIALIZER,
    cart: [],
    order: ORDER_INITIALIZER,
  }

  // 20% VAT tax rate for customer order
  export const VAT_TAX_RATE = 0.2;

  // $50 shipping cost per order
  export const SHIPPING_COST = 50;
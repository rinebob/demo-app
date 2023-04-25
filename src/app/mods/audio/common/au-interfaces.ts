import { ElementRef } from "@angular/core";


export interface NavButtonConfig {
    text: string;
    link: string;
}

export interface Category {
    name: string;
    displayName: string;
    image: string;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    image: {[key: string]: string};
    category: string;
    categoryImage: {[key: string]: string};
    new: boolean;
    price: number;
    description: string;
    features: string;
    includes: Content[];
    gallery: {[key: string]: {[key: string]: string}};
    others: RelatedProduct[];
    count?: number;
}

export interface Content {
    quantity: number;
    item: string;
}

export interface RelatedProduct {
    slug: string;
    name: string;
    image: {[key: string]: string};
}

export enum AppText {
    LOGO_TEXT = 'audiophile',
    NEW_PRODUCT = 'new product',
    SEE_PRODUCT = 'see product',
    ADD_TO_CART = 'add to cart',
    CHECKOUT = 'checkout',
    CONTINUE_AND_PAY = 'continue & pay',
    HOME = 'home',
    BACK_TO_HOME = 'back to home',
    FEATURES = 'features',
    IN_THE_BOX = 'in the box',
    ALSO_LIKE = 'you may also like',
    SHOP = 'shop',
    GO_BACK = 'go back',
    ZX9_SPEAKER = 'zx9 speaker',
    ZX9_SPEAKER_SLUG = 'zx9-speaker',
    ZX7_SPEAKER = 'zx7 speaker',
    ZX7_SPEAKER_SLUG = 'zx7-speaker',
    YX1_HEADPHONES = 'yx1 earphones',
    YX1_HEADPHONES_SLUG = 'yx1-earphones',
    XX99_HEADPHONES = 'xx 99 mark ii headphones',
    XX99_HEADPHONES_SLUG = 'xx99-mark-two-headphones',
    REMOVE_ALL = 'remove all',
    CART = 'cart',
    TOTAL = 'total',
    SUMMARY = 'summary',
    SHIPPING = 'shipping',
    VAT_INCLUDED = 'vat (included)',
    GRAND_TOTAL = 'grand total',
    THANK_YOU_MESSAGE = 'thank you for your order',
    CONFIRMATION_MESSAGE = 'You will receive an email confirmation shortly.',
    
    

}

export interface AddToCartProduct {
    id: number;
    slug: string;
}

export enum PaymentMethod {
    COD = 'cash on delivery',
    E_MONEY = 'e-money',
  }
  
  export interface Customer {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    paymentMethod?: PaymentMethod;
    eMoneyNumber?: string;
    eMoneyPin?: string;
  }

  export interface CartItemData {
    quantity: number;
    price: number;
  }

  export interface CartItem {
    [key: string]: number;      // key is product slug, value is quantity ordered
  }
  
  export interface Order {
    customer?: Customer;
    products: CartItem[];
    totalCost: number;
    shippingCost: number;
    vatCost: number;
    grandTotal: number;
    totalItemsCount: number;
    orderDate: Date;
  }
  
  export interface AudioState {
    customer: Customer;
    cart: CartItem[];
    order: Order;
  }

  export interface CustomerOrders {
    // key is customer id/displayname value is all the orders for that customer   
    [key: string]: Order[];
  }

  export enum AudioDialogCloseResult {
    PROCEED_TO_CHECKOUT = 'proceed to checkout',
  }

  export enum CartDetailMode {
    SUMMARY = 'summary',
    DETAIL = 'detail',
  }

  export interface CartDialogData {
    mode?: CartDetailMode;
    order?: Order;
    product?: Product;
    ref?: ElementRef;
    url?: string;
  }

  export enum ViewportMode {
    DESKTOP = 'desktop',
    TABLET = 'tablet',
    MOBILE = 'mobile',
  }

  export interface ImageByViewport {
    [key: string]: string;
  }
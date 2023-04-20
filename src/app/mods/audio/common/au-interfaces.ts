

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
    NEW_PRODUCT = 'new product',
    SEE_PRODUCT = 'see product',
    ADD_TO_CART = 'add to cart',
    CHECKOUT = 'checkout',
    CONTINUE_AND_PAY = 'continue & pay',
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

}

export interface AddToCartProduct {
    id: number;
    slug: string;
}
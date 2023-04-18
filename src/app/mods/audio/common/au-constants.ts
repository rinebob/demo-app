import { Category, NavButtonConfig } from "./au-interfaces";

export const NavButtons: NavButtonConfig[] = [
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

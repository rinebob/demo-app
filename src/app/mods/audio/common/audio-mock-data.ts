import { CartItem, Customer, Order, PaymentMethod, Product } from './au-interfaces';

export const MOCK_CUSTOMER: Customer = {
  name: 'Joe Smith',
  email: 'joe@smith.com',
  phoneNumber: '555 555 5555',
  address: '123 Shady Bend Ln',
  city: 'Someplace',
  state: 'OT',
  zip: '90125',
  country: 'USA',
  paymentMethod: PaymentMethod.COD,
  eMoneyNumber: '123abc',
  eMoneyPin: 'pin',
}

export const POPULATED_SHOPPING_CART: CartItem[] = [
  {
      "xx99-mark-two-headphones": 2
  },
  {
      "xx99-mark-one-headphones": 3
  },
  {
      "xx59-headphones": 4
  },
  {
      "zx7-speaker": 3
  },
  {
      "zx9-speaker": 3
  },
  {
      "yx1-earphones": 3
  }
];

export const AUDIO_PRODUCT_1: Product = {
  "id": 1,
  "slug": "yx1-earphones",
  "name": "YX1 Wireless Earphones",
  "image": {
    "mobile": "../../../../assets/audio/product-yx1-earphones/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-yx1-earphones/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-yx1-earphones/desktop/image-product.jpg"
  },
  "category": "earphones",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-yx1-earphones/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-yx1-earphones/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-yx1-earphones/desktop/image-category-page-preview.jpg"
  },
  "new": true,
  "price": 599,
  "description": "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
  "features": "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
  "includes": [
    {
      "quantity": 2,
      "item": "Earphone unit"
    },
    {
      "quantity": 6,
      "item": "Multi-size earplugs"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "USB-C charging cable"
    },
    {
      "quantity": 1,
      "item": "Travel pouch"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-yx1-earphones/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-yx1-earphones/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-yx1-earphones/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-yx1-earphones/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-yx1-earphones/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-yx1-earphones/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-yx1-earphones/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-yx1-earphones/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-yx1-earphones/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-one-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-one-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-one-headphones.jpg"
      }
    },
    {
      "slug": "xx59-headphones",
      "name": "XX59",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx59-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx59-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx59-headphones.jpg"
      }
    },
    {
      "slug": "zx9-speaker",
      "name": "ZX9 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx9-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx9-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx9-speaker.jpg"
      }
    }
  ]
};
export const AUDIO_PRODUCT_2: Product = {
  "id": 2,
  "slug": "xx59-headphones",
  "name": "XX59 Headphones",
  "image": {
    "mobile": "../../../../assets/audio/product-xx59-headphones/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-xx59-headphones/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-xx59-headphones/desktop/image-product.jpg"
  },
  "category": "headphones",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-xx59-headphones/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-xx59-headphones/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-xx59-headphones/desktop/image-category-page-preview.jpg"
  },
  "new": false,
  "price": 899,
  "description": "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
  "features": "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\n\nMore than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.",
  "includes": [
    {
      "quantity": 1,
      "item": "Headphone unit"
    },
    {
      "quantity": 2,
      "item": "Replacement earcups"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "3.5mm 5m audio cable"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-xx59-headphones/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-xx59-headphones/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-xx59-headphones/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-xx59-headphones/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-xx59-headphones/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-xx59-headphones/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-xx59-headphones/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-xx59-headphones/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-xx59-headphones/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "xx99-mark-two-headphones",
      "name": "XX99 Mark II",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-two-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-two-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-two-headphones.jpg"
      }
    },
    {
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-one-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-one-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-one-headphones.jpg"
      }
    },
    {
      "slug": "zx9-speaker",
      "name": "ZX9 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx9-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx9-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx9-speaker.jpg"
      }
    }
  ]
};
export const AUDIO_PRODUCT_3: Product = {
  "id": 3,
  "slug": "xx99-mark-one-headphones",
  "name": "XX99 Mark I Headphones",
  "image": {
    "mobile": "../../../../assets/audio/product-xx99-mark-one-headphones/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-xx99-mark-one-headphones/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-xx99-mark-one-headphones/desktop/image-product.jpg"
  },
  "category": "headphones",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
  },
  "new": false,
  "price": 1750,
  "description": "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
  "features": "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.\n\nFrom the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is includes with a balanced gold connector.",
  "includes": [
    {
      "quantity": 1,
      "item": "Headphone unit"
    },
    {
      "quantity": 2,
      "item": "Replacement earcups"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "3.5mm 5m audio cable"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-xx99-mark-one-headphones/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-one-headphones/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-xx99-mark-one-headphones/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-one-headphones/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-xx99-mark-one-headphones/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-one-headphones/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "xx99-mark-two-headphones",
      "name": "XX99 Mark II",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-two-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-two-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-two-headphones.jpg"
      }
    },
    {
      "slug": "xx59-headphones",
      "name": "XX59",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx59-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx59-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx59-headphones.jpg"
      }
    },
    {
      "slug": "zx9-speaker",
      "name": "ZX9 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx9-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx9-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx9-speaker.jpg"
      }
    }
  ]
};
export const AUDIO_PRODUCT_4: Product = {
  "id": 4,
  "slug": "xx99-mark-two-headphones",
  "name": "XX99 Mark II Headphones",
  "image": {
    "mobile": "../../../../assets/audio/product-xx99-mark-two-headphones/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-xx99-mark-two-headphones/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-xx99-mark-two-headphones/desktop/image-product.jpg"
  },
  "category": "headphones",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg"
  },
  "new": true,
  "price": 2999,
  "description": "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  "features": "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
  "includes": [
    {
      "quantity": 1,
      "item": "Headphone unit"
    },
    {
      "quantity": 2,
      "item": "Replacement earcups"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "3.5mm 5m audio cable"
    },
    {
      "quantity": 1,
      "item": "Travel bag"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-xx99-mark-two-headphones/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-two-headphones/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-xx99-mark-two-headphones/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-two-headphones/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-xx99-mark-two-headphones/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-xx99-mark-two-headphones/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-one-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-one-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-one-headphones.jpg"
      }
    },
    {
      "slug": "xx59-headphones",
      "name": "XX59",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx59-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx59-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx59-headphones.jpg"
      }
    },
    {
      "slug": "zx9-speaker",
      "name": "ZX9 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx9-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx9-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx9-speaker.jpg"
      }
    }
  ]
};
export const AUDIO_PRODUCT_5: Product = {
  "id": 5,
  "slug": "zx7-speaker",
  "name": "ZX7 Speaker",
  "image": {
    "mobile": "../../../../assets/audio/product-zx7-speaker/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-zx7-speaker/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-zx7-speaker/desktop/image-product.jpg"
  },
  "category": "speakers",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-zx7-speaker/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-zx7-speaker/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-zx7-speaker/desktop/image-category-page-preview.jpg"
  },
  "new": false,
  "price": 3500,
  "description": "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
  "features": "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\n\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.",
  "includes": [
    {
      "quantity": 2,
      "item": "Speaker unit"
    },
    {
      "quantity": 2,
      "item": "Speaker cloth panel"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "3.5mm 7.5m audio cable"
    },
    {
      "quantity": 1,
      "item": "7.5m optical cable"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-zx7-speaker/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-zx7-speaker/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-zx7-speaker/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-zx7-speaker/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-zx7-speaker/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-zx7-speaker/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-zx7-speaker/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-zx7-speaker/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-zx7-speaker/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "zx9-speaker",
      "name": "ZX9 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx9-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx9-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx9-speaker.jpg"
      }
    },
    {
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-one-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-one-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-one-headphones.jpg"
      }
    },
    {
      "slug": "xx59-headphones",
      "name": "XX59",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx59-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx59-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx59-headphones.jpg"
      }
    }
  ]
};
export const AUDIO_PRODUCT_6: Product = {
  "id": 6,
  "slug": "zx9-speaker",
  "name": "ZX9 Speaker",
  "image": {
    "mobile": "../../../../assets/audio/product-zx9-speaker/mobile/image-product.jpg",
    "tablet": "../../../../assets/audio/product-zx9-speaker/tablet/image-product.jpg",
    "desktop": "../../../../assets/audio/product-zx9-speaker/desktop/image-product.jpg"
  },
  "category": "speakers",
  "categoryImage": {
    "mobile": "../../../../assets/audio/product-zx9-speaker/mobile/image-category-page-preview.jpg",
    "tablet": "../../../../assets/audio/product-zx9-speaker/tablet/image-category-page-preview.jpg",
    "desktop": "../../../../assets/audio/product-zx9-speaker/desktop/image-category-page-preview.jpg"
  },
  "new": true,
  "price": 4500,
  "description": "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
  "features": "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).\n\nDiscover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.",
  "includes": [
    {
      "quantity": 2,
      "item": "Speaker unit"
    },
    {
      "quantity": 2,
      "item": "Speaker cloth panel"
    },
    {
      "quantity": 1,
      "item": "User manual"
    },
    {
      "quantity": 1,
      "item": "3.5mm 10m audio cable"
    },
    {
      "quantity": 1,
      "item": "10m optical cable"
    }
  ],
  "gallery": {
    "first": {
      "mobile": "../../../../assets/audio/product-zx9-speaker/mobile/image-gallery-1.jpg",
      "tablet": "../../../../assets/audio/product-zx9-speaker/tablet/image-gallery-1.jpg",
      "desktop": "../../../../assets/audio/product-zx9-speaker/desktop/image-gallery-1.jpg"
    },
    "second": {
      "mobile": "../../../../assets/audio/product-zx9-speaker/mobile/image-gallery-2.jpg",
      "tablet": "../../../../assets/audio/product-zx9-speaker/tablet/image-gallery-2.jpg",
      "desktop": "../../../../assets/audio/product-zx9-speaker/desktop/image-gallery-2.jpg"
    },
    "third": {
      "mobile": "../../../../assets/audio/product-zx9-speaker/mobile/image-gallery-3.jpg",
      "tablet": "../../../../assets/audio/product-zx9-speaker/tablet/image-gallery-3.jpg",
      "desktop": "../../../../assets/audio/product-zx9-speaker/desktop/image-gallery-3.jpg"
    }
  },
  "others": [
    {
      "slug": "zx7-speaker",
      "name": "ZX7 Speaker",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-zx7-speaker.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-zx7-speaker.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-zx7-speaker.jpg"
      }
    },
    {
      "slug": "xx99-mark-one-headphones",
      "name": "XX99 Mark I",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx99-mark-one-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx99-mark-one-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx99-mark-one-headphones.jpg"
      }
    },
    {
      "slug": "xx59-headphones",
      "name": "XX59",
      "image": {
        "mobile": "../../../../assets/audio/shared/mobile/image-xx59-headphones.jpg",
        "tablet": "../../../../assets/audio/shared/tablet/image-xx59-headphones.jpg",
        "desktop": "../../../../assets/audio/shared/desktop/image-xx59-headphones.jpg"
      }
    }
  ]
};

export const AUDIO_PRODUCTS: Product [] = [
  AUDIO_PRODUCT_1,
  AUDIO_PRODUCT_2,
  AUDIO_PRODUCT_3,
  AUDIO_PRODUCT_4,
  AUDIO_PRODUCT_5,
  AUDIO_PRODUCT_6,
];

export const ORDERED_AUDIO_PRODUCTS: Product [] = [
  AUDIO_PRODUCT_6,
  AUDIO_PRODUCT_4,
  AUDIO_PRODUCT_1,
  AUDIO_PRODUCT_2,
  AUDIO_PRODUCT_3,
  AUDIO_PRODUCT_5,
];

export const PRODUCTS_IN_CART: Product [] = [
  {...AUDIO_PRODUCT_1, count: 2},
  {...AUDIO_PRODUCT_2, count: 3},
  {...AUDIO_PRODUCT_3, count: 4},
  {...AUDIO_PRODUCT_4, count: 3},
  {...AUDIO_PRODUCT_5, count: 3},
  {...AUDIO_PRODUCT_6, count: 3},
];

export const MOCK_ORDER: Order = {
  "products": [
      {
          "xx99-mark-two-headphones": 2
      },
      {
          "xx99-mark-one-headphones": 3
      },
      {
          "xx59-headphones": 4
      },
      {
          "zx7-speaker": 3
      },
      {
          "zx9-speaker": 3
      },
      {
          "yx1-earphones": 3
      }
  ],
  "totalCost": 40641,
  "shippingCost": 50,
  "vatCost": 8128,
  "grandTotal": 48819,
  "totalItemsCount": 18,
  "orderDate": "2023-06-12T15:54:13.862Z",
  "customer": {
      "name": "Joe Smith",
      "email": "joe@smith.com",
      "phoneNumber": "555 555 5555",
      "address": "123 Shady Bend Ln",
      "city": "Someplace",
      "state": "OT",
      "zip": "90125",
      "country": "USA",
      "paymentMethod": "cash on delivery",
      "eMoneyNumber": "123abc",
      "eMoneyPin": "pin"
  }
}
import { computed, inject } from "@angular/core";
import { Product } from "./models/products";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from "./services/toaster";
import { CartItem } from './models/cart-item';

export type EcommerceState = {
    products : Product[];
    category : string;
    wishlistItems : Product[];
    cartItems : CartItem[];

  
}

export const EcommerceStore = signalStore (
    {
        providedIn:'root'
    },
    withState({
        products :[
            {
              id: "prod-001",
              name: "Wireless Headphones",
              description: "Noise cancelling wireless headphones.",
              price: 199.99,
              imageUrl: "https://images.unsplash.com/photo-1518441902113-f2e4f1c89d7a",
              rating: 4.6,
              reviewCount: 1240,
              inStock: true,
              category: "Audio"
            },
            {
              id: "prod-002",
              name: "Smart Watch",
              description: "Smart watch with fitness and health tracking.",
              price: 299.99,
              imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
              rating: 4.4,
              reviewCount: 980,
              inStock: true,
              category: "Wearables"
            },
            {
              id: "prod-003",
              name: "Gaming Mouse",
              description: "High precision gaming mouse with RGB.",
              price: 59.99,
              imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
              rating: 4.5,
              reviewCount: 2100,
              inStock: true,
              category: "Gaming"
            },
            {
              id: "prod-004",
              name: "Mechanical Keyboard",
              description: "Mechanical keyboard with backlight.",
              price: 129.99,
              imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
              rating: 4.7,
              reviewCount: 3200,
              inStock: true,
              category: "Gaming"
            },
            {
              id: "prod-005",
              name: "Laptop",
              description: "Modern laptop for work and development.",
              price: 999.99,
              imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
              rating: 4.6,
              reviewCount: 540,
              inStock: true,
              category: "Electronics"
            },
            {
              id: "prod-006",
              name: "Bluetooth Speaker",
              description: "Portable Bluetooth speaker.",
              price: 89.99,
              imageUrl: "https://images.unsplash.com/photo-1585386959984-a41552231693",
              rating: 4.3,
              reviewCount: 870,
              inStock: true,
              category: "Audio"
            },
            {
              id: "prod-007",
              name: "External SSD",
              description: "Fast portable SSD storage.",
              price: 149.99,
              imageUrl: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52",
              rating: 4.8,
              reviewCount: 1120,
              inStock: true,
              category: "Storage"
            },
            {
              id: "prod-008",
              name: "Power Bank",
              description: "High capacity power bank.",
              price: 49.99,
              imageUrl: "https://images.unsplash.com/photo-1609592426076-2d3cddca1b00",
              rating: 4.4,
              reviewCount: 760,
              inStock: true,
              category: "Accessories"
            },
            {
              id: "prod-009",
              name: "Camera",
              description: "Professional digital camera.",
              price: 799.99,
              imageUrl: "https://images.unsplash.com/photo-1519183071298-a2962eadcdb2",
              rating: 4.7,
              reviewCount: 640,
              inStock: false,
              category: "Photography"
            },
            {
              id: "prod-010",
              name: "Game Console",
              description: "Next-gen gaming console.",
              price: 499.99,
              imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
              rating: 4.8,
              reviewCount: 4200,
              inStock: true,
              category: "Gaming"
            }
          ],
        category :'all',
        wishlistItems : [],
        cartItems:[]
    } as EcommerceState ),
    withComputed(({category , products , wishlistItems, cartItems })=>({
        filterProducts : computed(()=> {
            if(category() ==='all') return products();
            return products().filter(p => p.category.toLowerCase() === category().toLowerCase());
          }),
        wishlistCount : computed(()=> wishlistItems().length),
        cartCount : computed(()=> cartItems().reduce((acc,item)=> acc +item.quantity,0))
    })),
    withMethods((store,toaster = inject(Toaster))=>({
        setCategory : signalMethod<string>((category : string)=>{
            patchState(store,{category});
        }),
        addTowishliste :(product : Product)=>{
            const updateWhishlistItems = produce(store.wishlistItems() , (draft)=>{
                if(!draft.find(p => p.id === product.id))
                    draft.push(product);
            });

            patchState(store,{wishlistItems : updateWhishlistItems});
            toaster.success('Product Added To Whishlist');
        },

        removeFromWishlist:(product : Product)=>{
          patchState(store, {wishlistItems : store.wishlistItems().filter(p => p.id !== product.id)});
          toaster.success('Remove From Whishlist');
        },
        clearWishlist: ()=>{ patchState(store,{wishlistItems :[]}); },

        addToCart: (product :Product , quantity =1)=>{
          const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
          const updateCartItem = produce(store.cartItems() , (draft)=>{
            if(existingItemIndex !== -1 ){
              draft[existingItemIndex].quantity +=quantity;
              return;
            }

            draft.push({product,quantity});
          });
          patchState(store,{cartItems : updateCartItem});
          toaster.success(existingItemIndex !==-1 ? 'Product added again' : 'Product added to the cart');
        }

    }))
)
import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { WishListComponent } from './features/pages/wish-list/wish-list.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { AllOrdersComponent } from './features/pages/all-orders/all-orders.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:"full"},
    {path:'signUp',loadComponent:()=>import('./features/auth/sign-up/sign-up.component').then(component=>component.SignUpComponent),title:'signUp'},
    {path:'logIn',loadComponent:()=>import('./features/auth/log-in/log-in.component').then(component=>component.LogInComponent),title:'logIn'},
    {path:'forget-password',loadComponent:()=>import('./features/auth/forget-password/forget-password.component').then(component=>component.ForgetPasswordComponent),title:'forget-password'},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'cart',component:CartComponent,title:'cart',canActivate:[authGuard]},
    {path:'wishList',component:WishListComponent,title:'wishList',canActivate:[authGuard]},
    {path:'products',component:ProductsComponent,title:'products'},
    {path:'product-Details/:id',component:ProductDetailsComponent,title:'product-Details'},
    {path:'categories',component:CategoriesComponent,title:'categories'},
    {path:'brands',component:BrandsComponent,title:'brands'},
    {path:'order/:cId',loadComponent:()=>import('./features/pages/order/order.component').then(component=>component.OrderComponent),title:'order',canActivate:[authGuard]},
    {path:'allorders',component:AllOrdersComponent,title:'allorders',canActivate:[authGuard]},
    {path:'**',loadComponent:()=>import('./features/layout/not-found/not-found.component').then(component=>component.NotFoundComponent),title:'page not found'}
];
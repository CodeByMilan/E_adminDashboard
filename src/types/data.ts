import { authStatus } from "./status"

export interface User {
    id:string,
    email:string,
    username:string
    createdAt:string
}
export interface Category{
    id:string,
    categoryName:string
}
export enum OrderStatus{
    PENDING="pending",
    SHIPPED="shipped",
    DELIVERED="delivered",
    CANCELED="canceled",
    PREPARATION="preparation",

}

export interface Product{
    id?:string,
    productName:string,
    description:string,
    price:number,
    productImageUrl:string,
    productQuantity:number,
    createdAt?:string,
    updatedAt?:string,
    categoryId:string,
    userId:string,
    User?:User,
    Category?:Category
}
export enum PaymentMethod{
    cod="cod",
    khalti="khalti"
}
export interface ItemDetails{
    productId:string,
    quantity:number

}
export interface PaymentStatus{
    unpaid:"unpaid",
    paid:"paid"
}
interface Payment{
    paymentMethod:PaymentMethod
    paymentStatus:PaymentStatus
}
export interface OrderData{
    phoneNumber:string
    shippingAddress:string,
    totalAmount:number,
    paymentDetails:Payment
    items:ItemDetails[]
    id:string,
    orderStatus:OrderStatus
}


 export interface Initialstate{
    products:Product[],
    users:User[],
    orders:OrderData[],
    status:authStatus,
    singleProduct:Product|null

}
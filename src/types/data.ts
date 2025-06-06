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
    ONTHEWAY="ontheway",
    DELIVERED="delivered",
    CANCELED="canceled",
    PREPARATION="preparation",
    ALL="all"

}

export interface Product{
    id:string,
    productName:string,
    description:string,
    price:number,
    productImageUrl:string,
    productQuantity:number,
    createdAt:string,
    updatedAt?:string,
    categoryId:string,
    userId:string,
    User?:User,
    Category?:Category
    categoryName?:string
}
export enum PaymentMethod{
    COD="COD",
    Khalti="Khalti"
}
export interface ItemDetails{
    productId:string,
    quantity:number

}
export enum PaymentStatus {
    unpaid= "unpaid",
    paid = "paid",
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
    Payment:Payment
    createdAt : string,
}
export interface SingleOrder{
    id: string,
    quantity: number,
    orderId: string,
    createdAt : string,
    Product: {
        id: string,
        productName: string,
        price:number,
    productImageUrl:string,
    productQuantity:number,
        categoryId:string,
        Category: {
            categoryName ? : string
        }
    },
    Order: {
        id:string,
        phoneNumber: string,
        shippingAddress: string,
        totalAmount: number,
        orderStatus: OrderStatus,
        userId : string, 
        Payment: {
            paymentMethod: string,
            paymentStatus: PaymentStatus
        },
        User:{
            username:string
        }

    }
}
 export interface Initialstate{
    products:Product[],
    users:User[],
    orders:OrderData[],
    status:authStatus,
    singleProduct:Product|null
    category:Category[]
    singleOrder:SingleOrder[]

}
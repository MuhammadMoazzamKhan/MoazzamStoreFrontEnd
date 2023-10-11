import { useEffect, useState } from "react";
import axios from "axios";
import storeContext from "./storeContext"

const StoreState = (props) => {
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState('');
    const [cart, setCart] = useState([]);

    const getProducts = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/`)
        setProduct(response.data)
    }
    const filtration = async () => {
        if (filter !== "All" && filter) {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${filter.toLowerCase()}`)
            setProduct(response.data)
        } else {
            const response = await axios.get(`https://fakestoreapi.com/products/`)
            setProduct(response.data)
        }
    }
    const searchProduct = (value)=>{
        if(value.length > 1){
            const result = product.filter((v,i)=>{
                return value && v.title && v.title.toLowerCase().includes(value)
            })
            setProduct(result)
        }else{
            getProducts()
        }
    }
    useEffect(()=>{
        const carts = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(carts)
        // eslint-disable-next-line
    },[])

    const deleteCart = id =>{
        const carts = JSON.parse(localStorage.getItem("cart")) || [];
        const index = carts.findIndex(i => i.id === id);
        carts.splice(index,1)
        localStorage.setItem("cart" , JSON.stringify(carts))
        setCart(carts)
    }
    const updateQty =(type , id)=>{
        const carts = JSON.parse(localStorage.getItem("cart")) || [];
        const index = carts.findIndex(i => i.id === id);
        if(type === "+"){
            carts.splice(index , 1 , {...carts[index],qty : carts[index].qty + 1 })
        }else{
            carts.splice(index , 1 , {...carts[index],qty : carts[index].qty - 1 })
        }
        localStorage.setItem("cart" , JSON.stringify(carts))
        setCart(carts)
    }
    return (
        <storeContext.Provider value={{updateQty,deleteCart,searchProduct, setProduct, product, getProducts, filter, setFilter, filtration,setCart,cart }}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreState
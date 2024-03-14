import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles,setBottles]=useState([])
    const [cart,setCart]=useState([])
    useEffect(()=>{
        fetch('/public/bottles.json')
        .then(res => res.json())
        .then(data =>setBottles(data))
    },[])
    // load cart from local storage
    useEffect(()=>{
        console.log('call the use effect',bottles.length)
        if(bottles.length) {
            const storedCard=getStoredCart()
            console.log(storedCard,bottles)
            const saveCart=[]
            for(const id of storedCard){
                console.log(id)
                const bottle=bottles.find(bottle=>bottle.id === id)
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            console.log('saved card',saveCart)
            setCart(saveCart)
        }
    },[bottles])

    const handleAddToCart = bottle=>{
        const newCart=[...cart,bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }
    const handleRemoveFromCart = id=>{
        // visual cart
        const remainingCart= cart.filter(bottle =>bottle.id !==id)
        setCart(remainingCart)
        // remove from local storage
        removeFromLS(id)
    }
    return (
        <div>
            <h2>Bottles Available : {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-div">
            {
                bottles.map(bottle =><Bottle
                key={bottle.id}
                bottle={bottle}
                handleAddToCart={handleAddToCart}
                ></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;
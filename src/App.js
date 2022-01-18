import React, { useState,useEffect  } from "react";
import { commerce } from "./lib/commerce"
import { Products, Navbar, Cart, Checkout } from "./components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () =>{
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () =>{
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId,quanitity) =>{
    const { cart } = await commerce.cart.add(productId,quanitity);

    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quanitity) =>{
    const { cart } = await commerce.cart.update(productId, quanitity);

    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () =>{
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart)
  }

  const handleCaputeCheckout = async (checkoutTokenId, newOrder) => {
    try{
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

        setOrder(incomingOrder);
        refreshCart();
    }catch(error){
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() =>{
    fetchProducts();
    fetchCart();
  },[]);

  console.log(cart);
  
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route exact path="/cart" element={
            <Cart cart={cart} 
                handleUpdateCartQty={handleUpdateCartQty} 
                handleRemoveFromCart={handleRemoveFromCart} 
                handleEmptyCart={handleEmptyCart} />} />
          <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaputeCheckout} error={errorMessage} />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;

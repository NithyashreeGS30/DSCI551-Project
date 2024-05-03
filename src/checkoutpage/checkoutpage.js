import React, { useState } from 'react';
import './checkout.css';
import Popup from '../popup';

const CheckoutPage = ({ cartItems }) => {
  const [review, setReview] = useState('');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phoneNumber: ''
  });
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility

  if (!cartItems || cartItems.length === 0) {
    return <div className="checkout-page empty-cart">No items in cart</div>;
  }

  // Group cart items by name and calculate total quantity
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(group => group.name === item.Artist);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("items", cartItems); // Cart items information
    console.log("review", review); // Review text
    console.log("shipping", shippingDetails); // Shipping details
    
    try {
      // Map cartItems to individual product objects
      const products = cartItems.map(item => ({
        quantity: item.quantity,
        product_name: item.Title,
        price: parseFloat(item.Price.replace(' USD', '')) * item.quantity,
      }));
  
      // Send each product as a separate request
      const promises = products.map(product => 
        fetch('http://127.0.0.1:8000/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...product,
            review: review,
            shippingDetails: shippingDetails,
          }),
        })
      );
  
      // Wait for all requests to complete
      const responses = await Promise.all(promises);
  
      // Check if any request failed
      responses.forEach(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
      });
  
      // Show pop-up message on successful order placement
      setShowPopup(true);

      // Optionally, redirect to a success page or clear the cart
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="cart-items">
          {groupedItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.ArtImages}
                alt={item.Artist}
                className="product-image"
                style={{ width: '200px', height: '200px' }}
              />
              <div className="item-details">
                <div className="item-name">{item.Title}</div>
                <div className="item-title">{item.Artist}</div>
                <div className="item-price">{item.Price}</div>
                <div className="item-quantity">Quantity: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="shipping-details">
          <h3 className="shipping-title">Shipping Information</h3>
          <div className="shipping-inputs">
            <input type="text" name="fullName" placeholder="Full Name" required className="shipping-input" onChange={handleInputChange} />
            <input type="text" name="addressLine1" placeholder="Address Line 1" required className="shipping-input" onChange={handleInputChange} />
            <input type="text" name="addressLine2" placeholder="Address Line 2" className="shipping-input" onChange={handleInputChange} />
            <div className="city-state-zip">
              <input type="text" name="city" placeholder="City" required className="shipping-input small-input" onChange={handleInputChange} />
              <input type="text" name="state" placeholder="State" required className="shipping-input small-input" onChange={handleInputChange} />
              <input type="text" name="zip" placeholder="ZIP/Postal Code" required className="shipping-input small-input" onChange={handleInputChange} />
            </div>
            <input type="text" name="country" placeholder="Country" required className="shipping-input" onChange={handleInputChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" required className="shipping-input" onChange={handleInputChange} />
            <textarea
              name="review"
              placeholder="Write your review here..."
              className="shipping-input"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
      {/* Pop-up message */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          {showPopup && <Popup onClose={() => setShowPopup(false)} />}
            {/* Add any additional styling or content for the pop-up message here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

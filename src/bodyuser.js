// import React, { useState, useEffect } from 'react';
// import './BodyPage.css';
// import Header from './header/header';
// import CheckoutPage from './checkoutpage/checkoutpage'; 

// const BodyPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false); // State to track whether the cart is open
//   const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category
//   const [selectedArtist, setSelectedArtist] = useState(''); // State to hold the selected artist
//   const [products, setProducts] = useState([]); // State to hold fetched products
//   const [showCondition, setShowCondition] = useState(null); // State to track the visibility of condition information

//   useEffect(() => {
//     // Fetch products when selected category changes
//     if (selectedCategory) {
//       fetchProducts(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const fetchProducts = async (category) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/search_by_category?category=${category}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       // Convert products.artworks into an array using Object.values()
//       const artworksArray = Object.values(data.artworks);
//       setProducts(artworksArray);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };

//   // Function to handle category change
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   // Function to handle artist change
//   const handleArtistChange = async (artist) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/search_by_artist?artist=${artist}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       // Convert products.artworks into an array using Object.values()
//       const artworksArray = Object.values(data.artworks);
//       setProducts(artworksArray);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item._id === product._id);
  
//     if (existingItem) {
//       // If the item already exists in the cart, update its quantity
//       const updatedCartItems = cartItems.map((item) =>
//         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setCartItems(updatedCartItems);
//     } else {
//       // If the item is not in the cart, add it with quantity 1
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };
  
  

//   const toggleCart = () => {
//     setIsCartOpen(prevState => !prevState); // Toggle the state variable
//   };

//   // Function to handle click on product image
//   const handleImageClick = (productId) => {
//     setShowCondition(productId); // Set the productId to show the condition for that product
//   };

//   // Function to close condition information
//   const handleCloseCondition = () => {
//     setShowCondition(null); // Reset the showCondition state to hide condition information
//   };

//   return (
//     <div>
//       <Header
//         headName="SignOut"
//         cartCount={cartItems.length}
//         toggleCart={toggleCart}
//         onCategoryChange={handleCategoryChange} // Pass handleCategoryChange function to handle category change
//         onArtistChange={handleArtistChange} // Pass handleArtistChange function to handle artist change
//       />
//       <div className="body-page">
//         <div className="product-grid">
//           {products.map(product => (
//             <div key={product._id} className="product-card"> {/* Assuming _id is unique */}
//               <img
//                 src={product.ArtImages}
//                 alt={product.Artist}
//                 className="product-image"
//                 style={{ width: '200px', height: '200px' }} // Set fixed dimensions for images
//                 onClick={() => handleImageClick(product._id)} // Handle click on image
//               />
//               <div className="product-info">
//               <div className="product-name" style={{fontWeight:"bold"}}>{product.Title}</div>
//                 <div className="product-title">{product.Artist}</div>
//                 <div className="product-price">{product.Price}</div>
//                 {/* Show condition information if showCondition state matches product _id */}
//                 {showCondition === product._id && (
//                   <div className="product-condition">
//                     <h3>Condition:</h3>
//                     <p>{product.Condition}</p>
//                     <button onClick={handleCloseCondition} style={{background:"#ff9900",color:"white"}}>Close</button>
//                   </div>
//                 )}
//                 <button style={{marginTop:"10px"}}className="add-to-cart-button" onClick={() => addToCart(product)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Conditionally render CheckoutPage based on isCartOpen */}
//       {isCartOpen && <CheckoutPage cartItems={cartItems} />}
//     </div>
//   );
// };

// export default BodyPage;

import React, { useState, useEffect } from 'react';
import './BodyPage.css';
import Header from './header/header';
import CheckoutPage from './checkoutpage/checkoutpage'; 

const BodyPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to track whether the cart is open
  const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category
  const [selectedArtist, setSelectedArtist] = useState(''); // State to hold the selected artist
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [showCondition, setShowCondition] = useState(null); // State to track the visibility of condition information

  useEffect(() => {
    // Fetch products when selected category changes
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_by_category?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Convert products.artworks into an array using Object.values()
      const artworksArray = Object.values(data.artworks);
      setProducts(artworksArray);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle artist change
  const handleArtistChange = async (artist) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_by_artist?artist=${artist}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Convert products.artworks into an array using Object.values()
      const artworksArray = Object.values(data.artworks);
      setProducts(artworksArray);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
  
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState); // Toggle the state variable
  };

  // Function to handle click on product image
  const handleImageClick = (productId) => {
    setShowCondition(productId); // Set the productId to show the condition for that product
  };

  // Function to close condition information
  const handleCloseCondition = () => {
    setShowCondition(null); // Reset the showCondition state to hide condition information
  };

  return (
    <div>
      <Header
        headName="SignOut"
        cartCount={cartItems.length}
        toggleCart={toggleCart}
        onCategoryChange={handleCategoryChange} // Pass handleCategoryChange function to handle category change
        onArtistChange={handleArtistChange} // Pass handleArtistChange function to handle artist change
      />
      <div className="body-page">
        {/* Display text prompting user to select category or artist */}
        {(!selectedCategory && !selectedArtist) && (
          <div className="select-prompt">
            <p>Please select a category or artist to search.</p>
          </div>
        )}
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card"> {/* Assuming _id is unique */}
              <img
                src={product.ArtImages}
                alt={product.Artist}
                className="product-image"
                style={{ width: '200px', height: '200px' }} // Set fixed dimensions for images
                onClick={() => handleImageClick(product._id)} // Handle click on image
              />
              <div className="product-info">
              <div className="product-name" style={{fontWeight:"bold"}}>{product.Title}</div>
                <div className="product-title">{product.Artist}</div>
                <div className="product-price">{product.Price}</div>
                {/* Show condition information if showCondition state matches product _id */}
                {showCondition === product._id && (
                  <div className="product-condition">
                    <h3>Condition:</h3>
                    <p>{product.Condition}</p>
                    <button onClick={handleCloseCondition} style={{background:"#ff9900",color:"white"}}>Close</button>
                  </div>
                )}
                <button style={{marginTop:"10px"}}className="add-to-cart-button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Conditionally render CheckoutPage based on isCartOpen */}
      {isCartOpen && <CheckoutPage cartItems={cartItems} />}
    </div>
  );
};

export default BodyPage;

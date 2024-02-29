import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useCart } from './CartContext'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Product.css';  
import Footer from './Footer';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart(); // Use the useCart hook to access the addToCart function

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error('Error fetching product details:', error));

    // Get a list of all products
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        const allProducts = response.data.products;
        // Filter out the current product and randomly select 5 others
        const filteredProducts = allProducts.filter((p) => p.id !== id);
        setRelatedProducts(filteredProducts.slice(0, 5));
      })
      .catch((error) => console.error('Error fetching related products:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to Cart!');
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 2 products at a time
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <div className='product-card'>
        <h2>{product.title}</h2>
        <Carousel showThumbs={false} autoPlay={true}>
          {product.images.map((image, index) => (
            <div key={index} className='carousel-slide'>
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Carousel>

        <div className='product-details'>
          <p className='description'>Description: {product.description}</p>
          <p className='price'>Price: ${product.price}</p>
          {/* Additional product details can be added here */}
        </div>

        <button className='add-to-cart' onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <div className="related-products">
        <h2>Related Products</h2>
       
       
        <div className='related-product'>
             <Slider {...settings}>
             {relatedProducts.map((relatedProduct) => (
               <div key={relatedProduct.id} className='related-products-list' >
                 <img src={relatedProduct.thumbnail} alt={relatedProduct.title} className='' />
                 <h3>{relatedProduct.title}</h3>
                 <p>${relatedProduct.price}</p>
               </div>
             ))}
           </Slider>
        </div>
       
      </div>
      <Footer/>
    </>
  );
};

export default ProductPage;

import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Footer from './Footer';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <Header />
      <Carousel showThumbs={false} autoPlay infiniteLoop className='carousel-container'>
        {currentProducts.slice(0, 5).map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} className='carousel-img'/>
          </div>
        ))}
      </Carousel>
      <hr/>
      <div className="search-bar-container">
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="  Search Products"
            className="search-bar"
        />
        </div>


      <div className="product-grid">
        {currentProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <div className="card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">₹{product.price}</p>
              <p>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= filteredProducts.length}
        >
          Next
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;

import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]); 

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setFilteredProducts(data.products); 
    }
  };

  const selectPageHandler = (pageNo) => {
    setPage(pageNo);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={handleSearch}
        className="search-box"
      />
  
      {filteredProducts.length === 0 ? (
        <div>No products found</div>
      ) : (
        <div className="product-container">
          {filteredProducts.slice(page * 10 - 10, page * 10).map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.thumbnail} />
              <div className="product-title">{product.title}</div>
            </div>
          ))}
        </div>
      )}
  
      {filteredProducts.length > 0 && (
        <div className="pagination">
          {page === 1 ? (
            ""
          ) : (
            <span className="prev" onClick={() => setPage(page - 1)}>
              Previous
            </span>
          )}
  
          <div>
            {[...Array(Math.ceil(filteredProducts.length / 10))].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
          {page < Math.ceil(filteredProducts.length / 10) ? (
            <span className="next" onClick={() => setPage(page + 1)}>
              Next
            </span>
          ) : (
            " "
          )}
        </div>
      )}
    </div>
  );
  
};

export default App;
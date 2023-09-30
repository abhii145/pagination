import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const selectPageHandler = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <div className="product-container">
        {products.slice(page * 10 - 10, page * 10).map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.thumbnail} />
            <div className="product-title">{product.title}</div>
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          {page === 1 ? (
            ""
          ) : (
            <span className="prev" onClick={() => setPage(page - 1)}>
              Previous
            </span>
          )}

          <div>
            {[...Array(products.length / 10)].map((_, i) => {
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
          {page < products.length / 10 ? (
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

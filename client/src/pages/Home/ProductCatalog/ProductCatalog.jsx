import PaginatedProducts from "../../../components/PaginatedProducts/PaginatedProducts.jsx";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../../graphql/query.js";
import "./productCatalog.scss"

const ProductCatalog = () => {
    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    
      // const [sort, setSort] = useState("name");
      // const [order, setOrder] = useState("asc")
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error... :</p>;

        const { products = [] } = data;
    return (
         <div className="main-content">
                <div className="aside">
                  <p>Бічна панель</p>
                   <br></br>
                   <div>
                        {/* <div className="search-container">
                          <p>Фільтри:</p>
                          <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                          >
                            <option value="name">Назва</option>
                            <option value="year">Рік видання</option>
                            <option value="price">Ціна</option>
                            <option value="author">Автор</option>
                          </select>
        
                          <div>
                            <p>Сортування:</p>
                            <select
                              value={order}
                              onChange={(e) => setOrder(e.target.value)}
                            >
                              <option value="asc">За зростанням</option>
                              <option value="desc">За спаданням</option>
                            </select>
                          </div>
                        </div> */}
                </div>
                </div>
                {/* <div className="sideBar"><SideBar /></div> */}
              
        
              <div className="products-list">
                <PaginatedProducts products={products} productsPerPage={10} />
              </div>
              </div>
    )
}

export default ProductCatalog;

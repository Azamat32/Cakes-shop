import { useEffect, useState } from "react";
import axios from "axios";
import "./AllProducts.scss";
type Props = {};
interface Product {
  id: number;

  name: string;
  price: number;
  type: string;
}
const AllProducts = (_props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Make an API request to fetch the products from the backend

    axios
      .get("http://localhost:5000/api/products/catalog")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      // Make a DELETE request to remove the product
      await axios.delete(
        `http://localhost:5000/api/products/catalog/${productId}`
      );

      // Update the products state by filtering out the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
      <h2>Все продукты</h2>
      <table>
        <thead>
          <tr>
            <th>Имя товара</th>
            <th>Цена</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.type}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;

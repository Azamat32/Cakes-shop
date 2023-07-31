import axios from "axios";
import { useEffect, useState } from "react";
type Props = {};
interface Catalog {
  id: number;
  name: string;
}
const AddNewModerators = (props: Props) => {
  const [catalogName, setCatalogName] = useState("");
  const [categories, setCategories] = useState<Catalog[]>([]);
  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePostCatalog = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/products/categories",
        {
          CatalogName: catalogName, 
        },
        {
          headers: {
            Authorization: token, // Include the JWT token in the request headers
          },
        }
      )
      .then(() => {
        fetchCategories();
      })
      .catch(() => {});
  };

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog_inner">
          <div className="catalog_all">
            <title>
              <h1>Все виды товаров</h1>
            </title>
            <div className="catalog_wrap">
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="catalog_post">
            <input
              type="text"
              placeholder="Новый вид товара"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
            />
            <button type="submit" onClick={handlePostCatalog}>
              {" "}
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewModerators;

import axios from "axios";
import { useEffect, useState } from "react";
import "./CatalogsItem.scss";

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
    const token = localStorage.getItem("tokenAdmin");
    console.log(token);
    
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

  const handleDeleteCatalog = (catalogId: number) => {
    const token = localStorage.getItem("tokenAdmin");

    axios
      .delete(`http://localhost:5000/api/products/categories/${catalogId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        fetchCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog_inner">
          <div className="catalog_post">
            <input
              type="text"
              placeholder="Новый вид товара"
              value={catalogName}
              onChange={(e) => setCatalogName(e.target.value)}
            />
            <button type="submit" onClick={handlePostCatalog}>
              Добавить
            </button>
          </div>
          <div className="catalog_all">
            <h1>Все виды товаров</h1>
            <div className="catalog_wrap">
              <table>
                <thead>
                  <tr>
                    <th>Название</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteCatalog(category.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewModerators;

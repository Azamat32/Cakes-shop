import { useEffect, useState } from "react";
import axios from "axios";
import "./addProduct.scss";

type Props = {};

interface Category {
  id: number;
  name: string;
}


const AddNewProducts = (_props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState<string>(""); // Set a default value for type

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch the categories from the backend
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategories(response.data);
        setType(response.data[0]?.name || "");
      });
  }, []);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("tokenAdmin");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image as Blob);
    formData.append("type", type);
    
    try {
      // Make a POST request to the backend endpoint
      const response = await axios.post(
        "http://localhost:5000/api/products/catalog",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

    } catch (error) {
      // If there's an error, you can handle it here (e.g., show an error message)
      console.error(error);
    }
  };

  return (
    <div className="addProduct">
      <h1>Добавить новый товар</h1>
      <form onSubmit={handleFormSubmit} className="addProductForm" >
        <div className="inputGroup">
          <label>Имя товара</label>
          <input
            type="text"
            placeholder="Имя товара"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>Цена</label>
          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label>Картинка</label>
          <input
            type="file"
            name="image"
            
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div className="inputGroup">
          <label>Тип товара</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
};

export default AddNewProducts;

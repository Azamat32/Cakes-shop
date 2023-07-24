import "./addProduct.scss"
type Props = {}

const AddNewProducts = (_props: Props) => {
  return (
    <div className="addProduct">
      <h1>Добавить новый товар</h1>
      <form action="/" method="POST" className="addProductForm">
        <div className="inputGroup">
          <label >Имя товара</label>
          <input type="text" placeholder="Имя товара" />
        </div>
        <div className="inputGroup">
          <label >Цена</label>
          <input type="Number" placeholder="Цена" />
        </div>
        <div className="inputGroup">
          <label >Цена</label>
          <input type="file" placeholder="Выберите картинку" />
        </div>
      </form>
    </div>
  )
}

export default AddNewProducts
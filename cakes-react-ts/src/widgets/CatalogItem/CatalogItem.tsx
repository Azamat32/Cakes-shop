type ItemProps = {
  itemImage: string;
  price: number;
  title: string;
  role: string;
};
import "./CatalogItem.scss";
const CatalogItem = (props: ItemProps) => {
  const { price, title, itemImage, role } = props;
  return (
    <div className="Item" role="Торты">
      <div className="item_inner">
        <div className="item_image">
          <img src={itemImage} alt="" />
        </div>
        <div className="item_content">
          <div className="item_text">
            <div className="item_product_name"><span>{title}</span></div>
            <div className="item_product_cost"><span>{price} ₸</span></div>
          </div>
          <div className="item_btn">
            <button>Купить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;

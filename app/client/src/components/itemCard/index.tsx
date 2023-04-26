import { categoriesBkRGB, categoriesRGB } from "../../../api/index";
import { createCSGOImage } from "../../../api/createCSGOImage";
import './index.less';

interface ItemcardProps {
  info: any
}

const ItemCard = (props: ItemcardProps) => {
  const { info } = props;
  const url = createCSGOImage(info.item_url);

  return <>
    <div className="item-card"
    style={{background: `linear-gradient(white 0%, white 30%, ${(categoriesBkRGB as any)[info.category]})`}}
    >
      <div className="item-card-img">
        <img style={{width: 80}} src={url} alt="" />
      </div>
      <div className="item-info">
        <div><span className="item-color" style={{backgroundColor: (categoriesRGB as any)[info.category]}}></span> {info.item_name}</div>
        <div>
          数量：<span style={{fontSize: 16, fontWeight: 'bold'}}>{info.combined_QTY}</span>
        </div>
      </div>
    </div>
  </>
}

export default ItemCard;

import { IconArrowNarrowRightDashed,IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from './Products.module.css';
const ProductCard = ({ product }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-12">
      <Link to={`/product-details/${product?.id}`}  className={`d-block px-4 pt-3 pb-4 border bg-white shadow-sm my-2 rounded-3 ${style.p_card}`}>
        <div className={style.ribbon}>{product?.price}$</div>
        {imgLoading && <span className="loader"></span>}

        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="object-fit-cover w-100 img-thumbnail my-2"
          style={{ display: imgLoading ? "none" : "block" }}
          onLoad={() => setImgLoading(false)}
        />

        <h5 className="mt-3 d-flex align-items-center main-color fs-5"><IconChevronsRight size={15} stroke={1}/> <span className="mx-1">{product?.title.slice(0, 15)}...</span></h5>
        <p className="text-secondary text-sm">{product?.description.slice(0, 50)}...</p>

        <span className={`${style.card_btn} shadow-sm text-sm`}>
          Product Details <IconArrowNarrowRightDashed/>
        </span>

      </Link>
    </div>
  );
};

export default ProductCard;
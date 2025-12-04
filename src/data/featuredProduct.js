import chino1 from "../assets/product/chino_front.jpg";
import chino2 from "../assets/product/chino_front1.jpg";
import chino3 from "../assets/product/chino_diag.jpg";
import chino4 from "../assets/product/chino_back.jpg";
import chino5 from "../assets/product/detail-chino-front.jpg";
import chino6 from "../assets/product/detail-chino-chino_back.jpg";
import chino7 from "../assets/product/detail-chino-diag.jpg";

const featuredProduct = {
  id: 1,
  name: "Chino Pants",
  price: "Rp99.900",
  description:
    "Comfortable premium chino pants made from durable and breathable materials, suitable for daily wear.",
  images: [chino1, chino2,chino5, chino3, chino6, chino4, chino7],
  stock: {
    M: 7,
    L: 17,
    XL: 12,
    XXL: 3,
    XXXL: 3,
    XXXXL: 1,
  },
};

export default featuredProduct;

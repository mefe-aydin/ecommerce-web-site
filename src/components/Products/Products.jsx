import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

const products = [
  { id: 1, name: "Shoes", description: "Running shoes.", price: "$50", image:"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b89cb68c-2da6-4dac-9e64-b9c2ce7df166/wearallday-shoe-NpvSP5.png" },
  { id: 2, name: "Mackbook", description: "Apple mackbook.", price: "$100", image:"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000" },
];

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) =>(
                    <Grid item key={product.id} xs={12} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>))}
            </Grid>
        </main>
    )
  
};

export default Products;

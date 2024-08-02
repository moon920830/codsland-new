import React, { useEffect, useState } from "react";
import ShopFilter from "../../components/shop/filter";
import ShopCard from "../../components/shop/card";
import { GetProductsByCategory, GetProductsAll, GetCartCount } from "../../api/api";
import { useSnackbar } from "notistack";
import TablePagination from "@mui/material/TablePagination";
import SpeedDial from "@mui/material/SpeedDial";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";

// Define the structure of the product data
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const Shop: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let result;
        if (categoryId !== "all") {
          result = await GetProductsByCategory(page, rowsPerPage, categoryId, enqueueSnackbar);
        } else {
          result = await GetProductsAll(page, rowsPerPage, enqueueSnackbar);
        }
        
        if (result && result.pagedata) {
          setProducts(result.pagedata);
          setTotalProduct(result.totalNumbers || 0);
          setRowsPerPage(result.pagesize || rowsPerPage);
        } else {
          setProducts([]);
          setTotalProduct(0);
        }
      } catch (error) {
        enqueueSnackbar("Failed to load products", { variant: "error" });
      }
    };

    fetchProducts();
  }, [categoryId, rowsPerPage, page, enqueueSnackbar]);

  useEffect(() => {
    const fetchCartCounts = async () => {
        const result = await GetCartCount(enqueueSnackbar);
        setCartCount(result)
    }
    fetchCartCounts();
  }, [])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="mx-20 flex pt-[150px] pb-[100px] gap-5">
      <div className="basis-4/12">
        <ShopFilter setCategoryId={setCategoryId} />
      </div>
      <div className="basis-8/12 shadow-2xl py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <ShopCard
                  id={product._id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  setCartCount={setCartCount}
                />
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
        <div className="mt-10 w-full">
          <TablePagination
            component="div"
            count={totalProduct}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ width: "100%" }}
          />
        </div>
      </div>
      <Link to="/shop/cart">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 100, right: 80 }}
        icon={
          <div className="text-center">
            <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
            <Badge
              badgeContent={cartCount}
              color="secondary"
              sx={{ marginLeft: "10px", marginBottom: "30px" }}
            />
          </div>
        }
      />
      </Link>
    </div>
  );
};

export default Shop;

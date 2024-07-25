import React, { useEffect, useState } from "react";
import ShopFilter from "../../components/shop/filter";
import ShopCard from "../../components/shop/card";
import { GetProductsByCategory, GetProductsAll } from "../../api/api";
import { useSnackbar } from "notistack";
import TablePagination from "@mui/material/TablePagination";

const Shop: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<any[]>([]);
  const [totalProduct, SetTotalProduct] = useState(0);
  useEffect(() => {
    if (categoryId !== "all") {
      const GetProducts = async () => {
        const result: any = await GetProductsByCategory(
          page,
          rowsPerPage,
          categoryId,
          enqueueSnackbar
        );
        setProducts(result.pagedata);
        SetTotalProduct(result.totalNumbers);
        setRowsPerPage(result.pagesize);
      };
      GetProducts();
    } else {
      const GetProducts = async () => {
        const result: any = await GetProductsAll(
          page,
          rowsPerPage,
          enqueueSnackbar
        );
        setProducts(result.pagedata);
        SetTotalProduct(result.totalNumbers);
        setRowsPerPage(result.pagesize);
      };
      GetProducts();
    }
  }, [categoryId, rowsPerPage, page]);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event)
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
      <div className="basis-8/12 shadow-2xl py-10 px-5 ">
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index}>
                <div className="">
                  <ShopCard
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
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
    </div>
  );
};

export default Shop;

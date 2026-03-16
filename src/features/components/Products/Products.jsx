import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, fetchProductsByCategory, searchProducts } from "../../../shared/redux/Slices/ProductsSlice";
import ProductCard from "./ProductCard";
import Ripples from "react-ripples";
import { IconCategory2, IconSearch } from "@tabler/icons-react";
import Loading from "./Loading";
import Select from "react-select";

const Products = () => {
    const dispatch = useDispatch();
    const { products, categories, total, limit, isLoading, error } =
        useSelector((state) => state.products);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 8, skip: 0 }));
        dispatch(fetchCategories());
    }, [dispatch]);

    const categoryOptions = [
        { value: "", label: "All Categories" },
        ...categories.map((cat) => ({
            value: cat,
            label: cat,
        })),
    ];
    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    };
    const handleSearchClick = () => {
        setPage(1);
        setSelectedCategory("");

        if (search.trim() === "") {
            dispatch(fetchProducts({ limit: 8, skip: 0 }));
        } else {
            dispatch(searchProducts({ query: search, limit: 8, skip: 0 }));
        }
    };
    const handleCategoryClick = () => {
        setPage(1);
        setSearch("");

        if (!selectedCategory) {
            dispatch(fetchProducts({ limit: 8, skip: 0 }));
        } else {
            dispatch(
                fetchProductsByCategory({
                    category: selectedCategory,
                    limit: 8,
                    skip: 0,
                })
            );
        }
    };
    const handlePageChange = (newPage) => {
        const skip = (newPage - 1) * limit;

        setPage(newPage);

        if (search) {
            dispatch(searchProducts({ query: search, limit, skip }));
        }
        else if (selectedCategory) {
            dispatch(
                fetchProductsByCategory({
                    category: selectedCategory,
                    limit,
                    skip,
                })
            );
        }
        else {
            dispatch(fetchProducts({ limit, skip }));
        }
    };
    const totalPages = Math.ceil(total / limit);
    const handleNext = () => {
        if (page < totalPages) {
            handlePageChange(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            handlePageChange(page - 1);
        }
    };
    return (
        <div className="products py-5">
            <div className="container">
                <h3 className="my-4 text-center main-color">
                    Products
                </h3>
                <hr/>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="my-2">
                            <input
                                type="text"
                                placeholder="Search by title..."
                                className="form-control"
                                value={search}
                                onChange={handleSearchInput}
                            />
                            <div className="my-2">
                                <Ripples color="#229ed1" during={1500}>
                                    <button
                                        className="btn btn-primary d-flex align-items-center"
                                        onClick={handleSearchClick}
                                    >
                                        <span className="mx-1">Search</span> <IconSearch size={16} />
                                    </button>
                                </Ripples>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div className="my-2">
                            <Select
                                options={categoryOptions}
                                value={categoryOptions.find((opt) => opt.value === selectedCategory)}
                                onChange={(option) => setSelectedCategory(option?.value || "")}
                                placeholder="Select Category"
                            />


                            <div className="my-2">
                                <Ripples color="#4ca14c" during={1500}>

                                    <button className="btn btn-success d-flex align-items-center" onClick={handleCategoryClick}>
                                        <span className="mx-1">Filter</span> <IconCategory2 size={16} />
                                    </button>
                                </Ripples>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-danger">{error}</div>
                ) : products.length > 0 ? (
                    <>
                        <div className="row">
                            {products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                        <div className="mt-4 d-flex justify-content-center align-items-center gap-3">

                            <button
                                className="btn btn-outline-dark btn-sm"
                                disabled={page === 1}
                                onClick={handlePrev}
                            >
                                Previous
                            </button>

                            <span className="fw-semibold">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                className="btn btn-outline-dark btn-sm"
                                disabled={page === totalPages}
                                onClick={handleNext}
                            >
                                Next
                            </button>

                        </div></>
                ) : (
                    <div className="text-center p-4 bg-white shadow-sm border rounded-3 my-3">
                        <img src="/empty.png" style={{ width: "auto", maxHeight: "120px" }} className="object-fit-cover mt-4 d-block mx-auto" alt='Not found' />
                        <p className="my-4">No Products</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../shared/redux/Slices/ProductsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Products.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IconCategory2, IconChevronsRight, IconListDetails, IconMessageCircleDollar, IconMessageStar, IconProgressCheck, IconStarFilled, IconTextCaption } from '@tabler/icons-react';
import Banner from '../Banner/Banner';
import Loading from './Loading';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedProduct, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProduct(id))
    }, [id,dispatch]);
    const images =
        selectedProduct?.images?.length > 0
            ? selectedProduct.images
            : [selectedProduct?.thumbnail];
    return (
        <>
            <Banner currentPage="Product details" bg="url(../../banner.jpg)" />
            <div className='py-5'>
                <div className='container'>
                    <h4><IconListDetails className='main-color' /> Product Details</h4>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        selectedProduct ? (
                            <>
                                <div className={`${style.details_card} shadow-sm`}>
                                    <div className={style.discount_ribbon}><span className='mt-4'>Discount</span> <span>{selectedProduct?.discountPercentage}</span></div>
                                    <div className='row'>
                                        <div className='col-xl-4 col-lg-4 col-md-12 col-12'>

                                            {images.length > 1 ? (

                                                <Swiper
                                                    modules={[Autoplay, Navigation, Pagination]}
                                                    loop={true}
                                                    autoplay={{
                                                        delay: 2500,
                                                        disableOnInteraction: false,
                                                    }}
                                                    navigation
                                                    pagination={{ clickable: true }}
                                                    spaceBetween={10}
                                                    breakpoints={{
                                                        0: { slidesPerView: 1 },
                                                        640: { slidesPerView: 1 },
                                                        1024: { slidesPerView: 1 },
                                                    }}
                                                >
                                                    {images.map((img, index) => (
                                                        <SwiperSlide key={index}>
                                                            <img
                                                                src={img}
                                                                alt={selectedProduct.title}
                                                                className="img-fluid rounded"
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            ) : (
                                                <img
                                                    src={images[0]}
                                                    alt={selectedProduct?.title}
                                                    className="img-fluid rounded"
                                                />
                                            )}
                                        </div>
                                        <div className='col-xl-8 col-lg-8 col-md-12 col-12'>
                                            <div className={style.info_card}>
                                                <h4 className="mt-3 d-flex align-items-center main-color fs-4">
                                                    <IconChevronsRight size={17} stroke={1} />
                                                    <span className="mx-1">{selectedProduct?.title}</span>
                                                </h4>
                                                <hr />
                                                <p className={`${style.category} my-3 d-flex align-items-center`}><IconCategory2 className='main-color' size={17} /><b className='mx-1 fw-medium'>Category :</b> <span className='text-sm'>{selectedProduct?.category}</span></p>
                                                <b className='d-flex align-items-center mb-3 fw-medium'><IconMessageCircleDollar className='main-color me-1' size={17} /> Price :</b>
                                                <p className={style.price}>{selectedProduct?.price}$</p>
                                                <b className='d-flex align-items-center mb-3 fw-medium'><IconProgressCheck className='main-color me-1' size={17} /> Availability Status :</b>
                                                <p>{selectedProduct?.availabilityStatus}</p>
                                                <b className='d-flex align-items-center mb-3 fw-medium'><IconTextCaption className='main-color me-1' size={17} /> Description :</b>
                                                <p className='text-secondary text-15'>{selectedProduct?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5><IconMessageStar className='main-color' size={20} /> Product Reviews</h5>
                                <div className='row'>
                                    {selectedProduct?.reviews?.length > 0 ? (
                                        selectedProduct?.reviews?.map((r, idx) => (
                                            <div className='col-xl-4 col-lg-4 col-md-6 col-12' key={idx}>
                                                <div className={`${style.details_card} shadow-sm`}>
                                                    <div className={`${style.rate} d-flex align-items-center`}><span>{r?.rating}</span> <IconStarFilled size={16} /></div>
                                                    <b className='d-block my-2 fw-medium'>Reviewer Name : <span className='fw-normal d-block'>{r?.reviewerName}</span></b>
                                                    <b className='d-block my-2 fw-medium'>Reviewer Email : <span className='fw-normal d-block'>{r?.reviewerEmail}</span></b>
                                                    <b className='d-block my-2 fw-medium'>Comment : <span className='fw-normal d-block'>{r?.comment}</span></b>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center p-4 bg-white shadow-sm border rounded-3 my-3">
                                <img src="/empty.png" style={{ width: "auto", maxHeight: "120px" }} className="object-fit-cover mt-4 d-block mx-auto" alt='Not found' />
                                <p className="my-4">No Reviews</p>
                            </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-4 bg-white shadow-sm border rounded-3 my-3">
                                <img src="/empty.png" style={{ width: "auto", maxHeight: "120px" }} className="object-fit-cover mt-4 d-block mx-auto" alt='Not found' />
                                <p className="my-4">Item Not Found</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
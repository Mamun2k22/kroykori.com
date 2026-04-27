import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiEye, FiHeart, FiShuffle } from "react-icons/fi";

import useCart from "../../../../hooks/useCart";
import useLoading from "../../../../hooks/useLoading";
import ProductLoader from "../../../../Spinner/ProductLoader";

const formatMoney = (n) => Number(n || 0).toLocaleString();

const getGuestId = () => {
  let id = localStorage.getItem("guestId");
  if (!id) {
    id = (crypto?.randomUUID?.() || `guest_${Date.now()}_${Math.random()}`)
      .toString()
      .replace(/\./g, "");
    localStorage.setItem("guestId", id);
  }
  return id;
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.4,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const buttonVariants = {
  hover: {
    scale: 1.08,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  },
  tap: {
    scale: 0.92,
  },
};

const iconVariants = {
  hover: {
    rotate: 360,
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const badgeVariants = {
  initial: { x: -20, opacity: 0, scale: 0.5 },
  animate: { x: 0, opacity: 1, scale: 1 },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
};

const imageVariants = {
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const priceVariants = {
  hover: {
    scale: 1.05,
    color: "#e11d48",
    transition: { duration: 0.2 },
  },
};

const PopularProduct = () => {
  const [visibleProducts, setVisibleProducts] = useState(48);
  const [hoveredCard, setHoveredCard] = useState(null);
  const showMoreProducts = () => setVisibleProducts((prev) => prev + 36);

  const { isLoading, showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const BASE = import.meta.env.VITE_APP_SERVER_URL;

  const {
    data: products = [],
    isLoading: queryLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      showLoader();
      try {
        const response = await fetch(`${BASE}api/products/public?limit=300`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
      } finally {
        hideLoader();
      }
    },
  });

  useEffect(() => {
    if (!isFetching) hideLoader();
  }, [isFetching, hideLoader]);

  const { mutate: addToCart } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const guestId = getGuestId();
      const response = await axios.post(`${BASE}api/cart`, {
        productId,
        quantity,
        customerId: guestId,
      });
      return response.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Added to Cart! ✨",
        text: "Product has been added to your cart!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        background: "#10b981",
        color: "#fff",
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response?.data?.message || err?.message || "Could not add to cart.",
      });
    },
  });

  const handleAddToCart = (productId) => addToCart({ productId, quantity: 1 });

  if (isLoading || queryLoading) return <ProductLoader />;

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {error.message}
      </div>
    );

  return (
    <>
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-xs font-extrabold tracking-[0.35em] text-pink-500 uppercase"
          >
            FEATURED
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-3 text-3xl md:text-4xl font-extrabold text-pink-600"
          >
            Our ALL <span className="text-pink-500">Items</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="h-[2px] w-10 bg-pink-500/70 rounded-full" />
            <span className="h-2 w-2 rounded-full bg-pink-500" />
            <span className="h-[2px] w-10 bg-pink-500/20 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      <section className="max-w-full mx-auto px-3 md:px-4 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          <AnimatePresence>
            {products.slice(0, visibleProducts).map((product, idx) => {
              const price = Number(product?.price || 0);
              const regularPrice = Number(product?.regularPrice || 0);

              const discount =
                regularPrice > price
                  ? Math.round(((regularPrice - price) / regularPrice) * 100)
                  : 0;

              const isOutOfStock =
                product?.stock === 0 ||
                product?.status === "out_of_stock" ||
                product?.isOutOfStock === true;

              let badgeText = "NEW";
              let badgeCls = "bg-gradient-to-r from-cyan-500 to-blue-500";

              if (isOutOfStock) {
                badgeText = "OUT OF STOCK";
                badgeCls = "bg-gradient-to-r from-gray-500 to-gray-700";
              } else if (discount > 0) {
                badgeText = `${discount}% OFF`;
                badgeCls = "bg-gradient-to-r from-amber-500 to-orange-500";
              } else if (
                String(product?.tag || "").toLowerCase() === "hot" ||
                product?.isHot === true
              ) {
                badgeText = "HOT 🔥";
                badgeCls = "bg-gradient-to-r from-red-500 to-pink-500";
              }

              return (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  custom={idx}
                  onHoverStart={() => setHoveredCard(product._id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative rounded-2xl bg-white border border-[#F77426]/30 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  style={{
                    boxShadow: hoveredCard === product._id ? "0 20px 40px -12px rgba(247, 116, 38, 0.25)" : "",
                  }}
                >
                  {/* Animated Badge */}
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={`absolute top-3 left-3 z-20 ${badgeCls} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md`}
                  >
                    {badgeText}
                  </motion.div>

                  {/* Image area */}
                  <Link to={`/product-details/${product._id}`} className="block relative overflow-hidden rounded-2xl pt-3">
                    <div className="h-44 sm:h-48 md:h-52 flex items-center justify-center px-4 overflow-hidden">
                      <motion.img
                        src={product.productImage}
                        alt={product.productName}
                        loading="lazy"
                        variants={imageVariants}
                        whileHover="hover"
                        className="max-h-full w-full object-contain"
                      />
                    </div>

                    {/* Animated Hover Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredCard === product._id ? 1 : 0, y: hoveredCard === product._id ? 0 : 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center gap-3"
                    >
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product-details/${product._id}`);
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#C82A5E] flex items-center justify-center shadow-lg hover:bg-[#C82A5E] hover:text-white transition-all duration-300"
                        title="Quick View"
                      >
                        <motion.div variants={iconVariants} whileHover="hover">
                          <FiEye />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          Swal.fire({
                            icon: "info",
                            title: "Wishlist",
                            text: "Wishlist feature will be added soon!",
                            timer: 1400,
                            showConfirmButton: false,
                          });
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#C82A5E] flex items-center justify-center shadow-lg hover:bg-[#C82A5E] hover:text-white transition-all duration-300"
                        title="Wishlist"
                      >
                        <motion.div variants={iconVariants} whileHover="hover">
                          <FiHeart />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          Swal.fire({
                            icon: "info",
                            title: "Compare",
                            text: "Compare feature will be added soon!",
                            timer: 1400,
                            showConfirmButton: false,
                          });
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#C82A5E] flex items-center justify-center shadow-lg hover:bg-[#C82A5E] hover:text-white transition-all duration-300"
                        title="Compare"
                      >
                        <motion.div variants={iconVariants} whileHover="hover">
                          <FiShuffle />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </Link>

                  {/* Content */}
                  <div className="px-4 pb-4 pt-2">
                    <Link to={`/product-details/${product._id}`} className="block">
                      <motion.h3
                        whileHover={{ x: 5, color: "#e11d48" }}
                        className="text-[15px] font-semibold text-gray-900 line-clamp-2 min-h-[42px] hover:text-pink-600 transition"
                      >
                        {product.productName}
                      </motion.h3>
                    </Link>

                    {/* Price + Cart */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-end gap-2">
                        <motion.span
                          variants={priceVariants}
                          whileHover="hover"
                          className="text-base font-extrabold text-rose-500 leading-none"
                        >
                          ৳{formatMoney(price)}
                        </motion.span>

                        {regularPrice > price && (
                          <span className="text-sm text-gray-400 line-through leading-none">
                            ৳{formatMoney(regularPrice)}
                          </span>
                        )}
                      </div>

                      {/* Animated Cart Button */}
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isOutOfStock}
                        onClick={() => {
                          if (isOutOfStock) {
                            Swal.fire({
                              icon: "warning",
                              title: "Out of stock",
                              text: "This product is currently unavailable.",
                              timer: 1600,
                              showConfirmButton: false,
                            });
                            return;
                          }
                          handleAddToCart(product._id);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                          isOutOfStock
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#F77426] to-[#e0631a] text-white hover:shadow-lg"
                        }`}
                        title={isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      >
                        <motion.div
                          animate={isOutOfStock ? {} : { rotate: [0, 360] }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <HiOutlineShoppingCart className="text-lg" />
                        </motion.div>
                      </motion.button>
                    </div>

                    {/* Animated Stock Indicator */}
                    {!isOutOfStock && product?.stock < 20 && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-2"
                      >
                        <div className="text-xs text-orange-500 font-semibold mb-1">
                          Only {product.stock} left!
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(product.stock / 20) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Animated Show More Button */}
        {visibleProducts < products.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={showMoreProducts}
              className="px-8 py-2.5 bg-gradient-to-r from-[#C82A5E] to-[#e0186b] text-white font-bold rounded-full hover:shadow-xl transition-all duration-300"
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
                className="inline-block"
              >
                আরও দেখুন
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default PopularProduct;
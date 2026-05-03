import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSiteSettings } from "../../context/SiteSettingsContext";

import { FiPhone, FiMapPin, FiMail, FiClock, FiChevronUp, FiCreditCard } from "react-icons/fi";
import { RiFacebookFill, RiYoutubeFill, RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn, FaTiktok, FaXTwitter, FaWhatsapp, FaGoogle } from "react-icons/fa6";
import { FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";

export default function NewFooter() {
  const { settings } = useSiteSettings();

  const company = settings?.siteName || "Kroykori";
  const phoneDisplay = settings?.phone || "01635-129195";
  const phoneTel = (settings?.phone || "01635129195").replace(/\s/g, "");
  const email = settings?.email || "support@kroykori.com";
  const address = settings?.address || "Badda link road, Dhaka";

  const waNumberOnly = String(settings?.whatsapp || "8801635129195").replace(/[^\d]/g, "");
  const whatsappLink = waNumberOnly ? `https://wa.me/${waNumberOnly}` : "#";

  const logoSrc = settings?.logo || logo;

  const CONTACT = {
    company,
    tagline: "Online Shop • Trusted Products • Fast Delivery",
    address,
    phoneDisplay,
    phoneTel,
    email,
    hours: "Support: Saturday–Thursday, 10:00 AM – 7:00 PM",
  };

  const SOCIALS = {
    facebookPage: "https://web.facebook.com/kroykori.com.bd",
    facebookGroup: "https://web.facebook.com/kroykori.com.bd",
    linkedin: "#",
    youtube: "#",
    instagram: "https://www.instagram.com/kroykoribd",
    tiktok: "#",
    twitterX: "#",
    googleBusiness: "#",
    whatsapp: whatsappLink,
  };

const PAYMENT_METHODS = [
  {
    name: "bKash",
    icon: <FaMobileAlt className="text-pink-500" />,
    label: "bKash",
  },
  {
    name: "Nagad",
    icon: <FaMobileAlt className="text-orange-500" />,
    label: "Nagad",
  },
  {
    name: "Cash on Delivery",
    icon: <FaMoneyBillWave className="text-green-500" />,
    label: "Cash on Delivery",
  },
  {
    name: "Bank",
    icon: <FaBuildingColumns className="text-blue-500" />,
    label: "Bank Transfer",
  },
];

  return (
    <footer className="relative bg-white text-gray-700 font-poppins text-[14px] border-t border-gray-200">
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr_.85fr_1fr]">
            {/* Col 1: brand + contacts */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logoSrc}
                  alt={`${CONTACT.company} logo`}
                  className="h-10 w-auto"
                  onError={(e) => (e.currentTarget.src = logo)}
                />
                <div className="leading-tight">
                  <div className="text-base font-extrabold text-gray-800">{CONTACT.company}</div>
                  <div className="text-xs text-gray-500">{CONTACT.tagline}</div>
                </div>
              </div>

              <p className="mt-3 max-w-xl text-sm text-gray-600 leading-relaxed">
                {settings?.footerText?.trim()
                  ? settings.footerText
                  : "Kroykori brings you trusted products, great deals, and a smooth online shopping experience — with fast support and easy ordering."}
              </p>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <FiPhone />
                  </span>
                  <a className="hover:text-sky-600 text-gray-700" href={`tel:${CONTACT.phoneTel}`}>
                    {CONTACT.phoneDisplay}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <FiMapPin />
                  </span>
                  <span className="text-gray-700">{CONTACT.address}</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <FiMail />
                  </span>
                  <a className="hover:text-sky-600 text-gray-700" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <FiClock />
                  </span>
                  <span className="text-gray-700">{CONTACT.hours}</span>
                </li>
              </ul>

              <a
                href={SOCIALS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-white font-extrabold hover:bg-emerald-700 transition"
                onClick={(e) => {
                  if (!waNumberOnly) e.preventDefault();
                }}
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>

            {/* Col 2: Quick Links */}
            <div className="hidden md:block">
              <FooterCol
                title="Quick Links"
                links={[
                  { label: "Home", to: "/" },
                  { label: "Shop", to: "/shop" },
                  { label: "Categories", to: "/categories" },
                  { label: "Offers", to: "/offers" },
                  { label: "About Us", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ]}
              />
            </div>

            {/* Col 3: Payment Methods */}
            <div className="hidden md:block">
              <div>
                <h4 className="text-[18px] font-semibold text-gray-800">Payment Methods</h4>
                <div className="mt-2 h-[2px] w-10 rounded bg-sky-500" />
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {PAYMENT_METHODS.map((method) => (
                    <li key={method.name} className="flex items-center gap-2">
                      <span className="text-lg flex items-center justify-center w-6 h-6">
  {method.icon}
</span>
                      <span>{method.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 4: Follow / Extra */}
            <div>
              <h4 className="text-[18px] font-semibold text-gray-800">Follow Us</h4>
              <div className="mt-2 h-[2px] w-10 rounded bg-sky-500" />

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Stay connected with {CONTACT.company} for updates, offers, and new product arrivals.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <SocialBtn Icon={RiFacebookFill} href={SOCIALS.facebookPage} label="Facebook" />
                <SocialBtn Icon={RiInstagramFill} href={SOCIALS.instagram} label="Instagram" />
                <SocialBtn Icon={FaWhatsapp} href={SOCIALS.whatsapp} label="WhatsApp" />
              </div>

              <div className="mt-6 rounded-2xl bg-sky-50 p-4 hidden lg:block border border-sky-100">
                <div className="text-sm font-extrabold text-gray-800">Need help fast?</div>
                <div className="mt-1 text-sm text-gray-600">
                  Message us on WhatsApp for product support, order help, and quick assistance.
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods - Mobile View */}
          <div className="mt-8 block md:hidden">
            <div className="text-center">
              <h4 className="text-[16px] font-semibold text-gray-800">Payment Methods</h4>
              <div className="mt-1 h-[2px] w-10 rounded bg-sky-500 mx-auto" />
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.name} className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="text-lg">{method.icon}</span>
                    <span>{method.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gray-200" />

          <div className="mt-0 md:mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">
              © 2026 Kroykori. All Rights Reserved.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-200 transition"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-200">
                <FiChevronUp />
              </span>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links = [] }) {
  return (
    <div>
      <h4 className="text-[18px] font-semibold text-gray-800">{title}</h4>
      <div className="mt-2 h-[2px] w-10 rounded bg-sky-500" />

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {links.map((item) => {
          const label = typeof item === "string" ? item : item?.label;

          if (typeof item === "object" && item?.to) {
            return (
              <li key={label}>
                <Link to={item.to} className="hover:text-sky-600 transition">
                  {label}
                </Link>
              </li>
            );
          }

          if (typeof item === "object" && item?.href) {
            return (
              <li key={label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition"
                >
                  {label}
                </a>
              </li>
            );
          }

          return (
            <li key={label}>
              <span className="opacity-80">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SocialBtn({ Icon, href, label = "Social" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-600 transition"
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
      }}
    >
      <Icon size={18} />
    </a>
  );
}
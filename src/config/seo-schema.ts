import { siteConfig } from "@/config/site";

export function getStructuredData() {
  const businessId = `${siteConfig.url}/#business`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite Entity
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: {
          "@id": businessId,
        },
      },

      // 2. LocalBusiness (Electronics & Computer Repair Shop)
      {
        "@type": "ElectronicsRepairShop",
        "@id": businessId,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo-trimmed.png`,
        image: siteConfig.ogImage,
        description:
          "Professional electronics and computer repair workshop in Nagpur. Specializing in laptop logic board micro-soldering, smart LED TV SMPS/backlight repair, and electronic appliance PCB diagnostics. Physical workshop drop-off only.",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        priceRange: "₹₹",
        hasMap: siteConfig.contact.googleMapsUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Near KMG Hospital, Tukdoji Complex",
          addressLocality: "Nagpur",
          addressRegion: "Maharashtra",
          postalCode: "440024",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.contact.coordinates.latitude,
          longitude: siteConfig.contact.coordinates.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: siteConfig.contact.schedule.opens,
            closes: siteConfig.contact.schedule.closes,
          },
        ],
        areaServed: {
          "@type": "City",
          name: "Nagpur",
        },
        paymentAccepted: "Cash, UPI",
        currenciesAccepted: "INR",
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Laptop & Desktop Computer Repair",
              description:
                "Component-level BGA chip reballing, motherboards, display repairs, and liquid damage recovery conducted at our Nagpur workshop.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Smart LED TV & Audio Repair",
              description:
                "4K LED TV repair, SMPS power supply restoration, backlight LED array replacement, and home theatre amplifiers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Electronic Appliance PCB Repair",
              description:
                "Micro-soldering and circuit board restoration for inverter appliances and industrial electronics.",
            },
          },
        ],
      },

      // 3. ProfessionalService (Digital Solutions & Website Development)
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#digital-solutions`,
        name: "Shukla Digital Solutions",
        parentOrganization: {
          "@id": businessId,
        },
        url: `${siteConfig.url}/website-development`,
        description:
          "High-performance Next.js business website development, modern UI/UX design, custom web platform engineering, and local SEO services in Nagpur.",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        areaServed: [
          {
            "@type": "City",
            name: "Nagpur",
          },
          {
            "@type": "Country",
            name: "India",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website Engineering & Digital Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Business Website Development",
                description:
                  "Sub-second load speed, Next.js architecture, and tailored editorial design for high-converting business websites.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Technical SEO & Search Optimization",
                description:
                  "Local SEO engineering for Nagpur businesses, rich JSON-LD snippets, and search engine discoverability.",
              },
            },
          ],
        },
      },
    ],
  };
}

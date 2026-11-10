export const siteConfig = {
  name: "Shukla Electronic & Computer Services",
  shortName: "Shukla Electronic",
  description:
    "Expert component-level electronics repair, laptop micro-soldering, LED TV service, and modern Next.js website development in Nagpur, Maharashtra.",
  url: "https://shuklaelectronic.vercel.app",
  ogImage: "https://shuklaelectronic.vercel.app/og-image.jpg",
  contact: {
    email: "sanjay.shukla1967@gmail.com",
    phone: "+91 98765 43210",
    address:
      "Shukla Electronic & Computer Services, Near KMG Hospital Tukdoji Complex, Nagpur, Maharashtra 440024, India",
    workingHours: "Tuesday – Sunday: 10:00 AM – 9:00 PM (Monday Closed)",
    schedule: {
      days: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "21:00",
      closedDay: "Monday",
    },
    coordinates: {
      latitude: 21.1196276,
      longitude: 79.1048427,
    },
    googleMapsUrl:
      "https://www.google.com/maps/place/Shukla+Electronic+%26+Computer+Services./@21.1196326,79.1022678,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd4bfe124b662f7:0x1376de9f4c22fe1e!8m2!3d21.1196276!4d79.1048427!16s%2Fg%2F11n0wrr2q0",
  },
  divisions: {
    repair: {
      name: "Electronics Repair",
      tagline: "Component-Level Repair & Hardware Restoration",
      policyNote:
        "All repairs are strictly conducted in-store at our workshop in Nagpur. We do not provide home visits, doorstep pickup, or delivery.",
    },
    digital: {
      name: "Digital Solutions",
      tagline: "Modern Websites & Custom Business Systems",
      policyNote:
        "High-performance Next.js websites, custom business management software, and tailored digital automations.",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

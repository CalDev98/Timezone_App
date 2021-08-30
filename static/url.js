import Script from "next/script";

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

<Script
  strategy="lazyOnload"
  src={`https://maps.googleapis.com/maps/api/js?key=${GEOCODE_API_KEY}&libraries=places`}
/>;

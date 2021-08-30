import { useState } from "react";
import Image from "next/image";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
import inputPic from "../public/cityscape.png";

function GetTimezone() {
  const TIMEZONE_API_KEY = process.env.TIMEZONE_API_KEY;
  const [input, setInput] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [timestamp, setTimestamp] = useState();
  const [formattedTime, setFormattedTime] = useState();

  const timezone = (e) => {
    e.preventDefault();
    console.log(input);

    // Get latitude & longitude from address.
    geocodeByAddress(input)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
      });
    setInput("");

    axios
      .get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`
      )
      .then((response) => {
        setTimestamp(response.data.formatted);
      });

    // Convert the timestamp to real timestamp
    const time = new Date(timestamp).toLocaleTimeString();

    setFormattedTime(time);
  };
  // console.log("Successfully got latitude and longitude", { latitude, longitude });
  console.log(timestamp);
  console.log("this is ", formattedTime);

  return (
    <div>
      <form
        onSubmit={timezone}
        className="w-full flex flex-col justify-center items-center"
      >
        <div
          className="w-full h-12 p-5 m-5 rounded-full border-0 
          focus:outline-none flex justify-evenly items-center bg-white"
        >
          <Image src={inputPic} width={45} height={45} alt="" />
          <input
            type="textDecoration: "
            placeholder="Enter city"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full h-8 p-5 border-0 
                focus:outline-none text-gray-900"
          />
        </div>
        <button
          className="w-1/2 h-8 p-6 border-0 bg-green-500 flex
                 justify-center items-center rounded-full focus:outline-none text-white"
          type="submit"
          // disabled={!input.value}
        >
          Get timezone
        </button>
      </form>
      <div className="p-5 m-5 flex flex-col justify-center items-center text-center">
        <p>
          latitude = {latitude} <br/> Longitude = {longitude}
        </p>
        <div
          className="w-2/3 bg-red-500 h-20 m-5 p-5 rounded-lg
        flex justify-center items-center text-center text-4xl font-semibold"
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default GetTimezone;

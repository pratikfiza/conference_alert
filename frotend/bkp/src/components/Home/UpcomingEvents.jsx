import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ad_image`)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEventClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="UPCOMING INTERNATIONAL CONFERENCES 2024" classes="text-center" />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-6 mt-8">
            {cards.slice(0, 4).map((card) => (
              <div
                onClick={() => { handleEventClick(card.url) }}
                className="flex flex-col h-full md:min-h-[40vh] w-[320px] mx-auto px-4 pt-4 pb-6 rounded-lg shadow-lg border border-gray-200 relative z-10 bg-white transition-transform transform hover:scale-105 cursor-pointer"
                key={card.id}
              >
                <div className="relative rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://www.conferencealerts.in/ad/${card.image}`} alt={card.hed} className="w-full h-52 object-fill" />
                </div>
                <article className="flex flex-col flex-grow px-2 mt-4">
                  <h2 className="font-bold text-xl hover:text-[#6D9886] transition-colors cursor-pointer mb-4">
                    {card.hed}
                  </h2>
                </article>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

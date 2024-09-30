import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      img_url: "/images/table.webp",
      price: 120,
      link: "/ads/table",
    },
    {
      title: "Bougie",
      img_url: "/images/bougie.webp",
      price: 8,
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      img_url: "/images/porte-magazine.webp",
      price: 45,
      link: "/ads/porte-magazine",
    },
    {
      title: "Vaisselier",
      img_url: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier",
    },
    {
      title: "Vide-poche",
      img_url: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche",
    },
    {
      title: "Dame-jeanne",
      img_url: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne",
    },
  ];

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            img_url={ad.img_url}
            link={ad.link}
            price={ad.price}
            title={ad.title}
            key={ad.title}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;

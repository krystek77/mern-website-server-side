import Photo from "../models/gallery.js";
const galleryData = [
  {
    title: "Dom Pomocy Społecznej w Rybniku",
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    rows: 1,
    cols: 2,
    equipment: "Pralma-16F, SE-16R",
  },
  {
    title: "Hotel*** w Słupsku",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    rows: 1,
    cols: 2,
    equipment: "Pralma-16F szt.2, SE-16R szt.1",
  },
  {
    title: "Klub sportowy LECH",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    rows: 2,
    cols: 1,
    equipment: "FX105, SE-10R szt.2",
  },
  {
    title: "NZOZ w Warszawie",
    image: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    rows: 2,
    cols: 1,
    equipment: "I30-200AV, FX180 szt.3",
  },
  {
    title: "SPZOZ w Lipsku",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    rows: 2,
    cols: 2,
    equipment: "Pralma-16F, SE-16R",
  },
  {
    title: "Dom Pomocy Społecznej w Krakowie",
    image: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    rows: 1,
    cols: 1,
    equipment: "Pralma-16F, SE-16R",
  },
  {
    title: "Dom Pomocy Społecznej w Kielcach",
    image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    rows: 2,
    cols: 2,
    equipment: "Pralma-16F, SE-16R",
  },
  {
    title: "Hotel Piast",
    image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    rows: 1,
    cols: 1,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "Leśny dwór",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    rows: 1,
    cols: 2,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "Bieńkowski resort",
    image: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    rows: 1,
    cols: 1,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "ZAZ Wałbrzych",
    image: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    rows: 1,
    cols: 1,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "ARGO Arena",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    rows: 2,
    cols: 1,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "WOLMOT",
    image: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    rows: 2,
    cols: 2,
    equipment: "Pralma-16F,SE-16R",
  },
  {
    title: "Korona Kielce",
    image: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    rows: 2,
    cols: 1,
    equipment: "Pralma-16F,SE-16R",
  },
];
export default async () => {
  const existingPhotos = await Photo.find({}, "_id");
  if (existingPhotos.length === 0) {
    await Photo.create(galleryData);
  }
};

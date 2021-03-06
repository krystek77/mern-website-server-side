import Photo from '../models/gallery.js';

const data = [
  {
    title: 'Dom Pomocy Społecznej w Kielcach',
    equipment: 'Pralma-16F - szt.1, SE-16R - szt.2',
    doneAt: new Date(2011, 0, 15),
  },
  {
    title: 'Klub Sportowy LECH',
    equipment: 'FX-240 - szt.1, SE-25R - szt. 1',
    doneAt: new Date(2019, 4, 20),
  },
  {
    title: 'ZAZ Kamionek Wielki',
    equipment: 'FX-600 - szt.1, Pralma-16F - szt.2, SE-25R - szt. 1',
    doneAt: new Date(2020, 2, 2),
  },
  {
    title: 'Okręgowa Spółdzielnia Mleczarska WART-MILK',
    equipment: 'SP-16R - szt.1',
    doneAt: new Date(2017, 2, 20),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
  {
    title: 'Okręgowa Spółdzielnia',
    equipment: 'PBE-22 - szt.1, PBE-15 - szt.2',
    doneAt: new Date(2017, 8, 12),
  },
];

export default async () => {
  const existingPhotos = await Photo.find({}, '_id');
  if (existingPhotos.length === 0) {
    await Photo.create(data);
  }
};

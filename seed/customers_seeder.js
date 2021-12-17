import Customer from '../models/customers.js';

const data = [
  {
    title: 'Kampingi i centra rekracji',
    subtitle:
      ' Oferta dla miłośników świeżego powietrza oraz dodatkowe usługi przy niskich kosztach inwestycyjnych z Twojej strony',
    markdown: `
## Swobodny dostęp do pralni sammobsługowej na Twoim kampingu lub centrum rekreacyjnym ma bardzo dużo korzyści!
    
Masz specyficzne wymagania. Twoim głównym zmartwieniem jest zadowolenie wczasowiczów, podczas gdy Ty chcesz zarabiać. 
Miejsce do mycia to kolejna okazja do osiągnięcia celu!
    
![Kampingi i centra rekreacyjne](../assets/images/customers/campsite.jpg)
    
Pralnia pomoże Ci wyróżnić się na tle konkurencji, 
oferując Twoim wczasowiczom użyteczną usługę **bez żadnych kosztów**, 
która zapewnia nawet dodatkowy dochód. Oprócz oferowania dodatkowej usługi bez zobowiązań, 
za niską cenę, wczasowicze nie muszą już martwić się o piętrzące się brudne pranie, 
czyste pranie przez cały pobyt i więcej czasu na korzystanie z oferowanych zajęć.
    
[Potrzebujesz rady](/kontakt)
[Pobierz ulotkę](../assets/pdf/customers/kampingi.pdf)
        `,
    image: 'campsite.jpg',
  },
  {
    title: 'Zdrowie i higiena',
    subtitle:
      'Zalety zintegrowanej pralni w szpitalach, klinikach, laboratoriach i klinikach weterynaryjnych',
    markdown: `
## Bardzo ważne jest, aby w laboratoriach, przemyśle spożywczym oraz w sektorze zdrowia zachować bezwzględną higienę
    
![Zdrowi i higiena](../assets/images/customers/healthandhygiene.jpg)
    
Badania pokazują, że pranie jest głównym czynnikiem rozprzestrzeniania się infekcji 
przez patogenne zarazki. Od 10 do 15% zakażeń szpitalnych wynika 
z niskiej jakości higieny prania. Musisz zatem upewnić się, 
że twoje pranie spełnia najwyższe kryteria higieny, 
aby chronić personel i pacjentów twojego zakładu lub użytkowników twoich produktów.
    
Clothing used by laboratory or clean room staff must be clean and bacteria-free.
    
[Potrzebujesz rady](/kontakt)
[Pobierz ulotkę](../assets/pdf/customers/kampingi.pdf)

        `,
    image: 'healthandhygiene.jpg',
  },
  {
    title: 'Kawiarnie, hotele, SPA i restuaracje',
    subtitle:
      'Znajdź odpowiednie wyposażenie pralnicze do Twojego hotelu, pensjonatu oraz restauracji',
    image: 'hotelandrestuarants.jpg',
  },
  {
    title: 'Firmy sprzątające',
    subtitle: 'Wybierz rozwiązania pralnicze odpowiednie do prania mopów',
    image: 'cleaningcompany.jpg',
  },
  {
    title: 'Pralnie przemysłowe i komercyjne',
    subtitle:
      'Primus oferuje niezrównane i innowacyjne sposoby osiągnięcia wysokiej wydajności, niezawodności oraz ekonomicznego wykorzystania zasobów i finansów.',
    image: 'industrialandcomerciallaundry.jpg',
  },
  {
    title: 'Marynarka wojenna, porty jachtowe',
    subtitle:
      'Potrzebujesz pełnej autonomii na morzu (statek wojskowy, jacht, liniowiec), dlatego warto rozważyć oszczędzającą miejsce profesjonalną pralnię.',
    image: 'nauticalandmaririmesector.jpg',
  },
  {
    title: 'Żłobki i przedszkola',
    subtitle:
      'Idealne rozwiązania pralnicze aby zachować higiene, wyeliminować bakterię i ułatwić zachowanie czystości ubrań',
    image: 'nursery.jpg',
  },
  {
    title: 'Centra rehabilitacyjne',
    subtitle:
      'Primus, dopasowane, ergonomiczne i uzasadnione rozwiązanie dla pralni w sektorze medyczno-socjalnym.',
    image: 'reahbilitationcenter.jpg',
  },
  {
    title: 'Apartamentowce, akademiki i internaty',
    subtitle:
      'Zaoferuj swoim mieszkańcom dodatkową usługę przy niskich nakładach inwestycyjnych z Twojej strony.',
    image: 'residentiallaundry.jpg',
  },
  {
    title: 'Domy Pomocy Społecznej, Domy Opieki',
    subtitle:
      'Rozwiązania pralnicze w domach opieki, domach starców, rezydencjach seniorów. Rozwiązanie, które traktuje delikatną odzież i spełnia standardy RABC.',
    image: 'retirementhome.jpg',
  },
  {
    title: 'Stadniny koni',
    subtitle:
      'Używaj przemysłowych urządzeń pralniczych o dużej wydajności, które są odpowiednie do sierści zwierząt',
    image: 'ridingstable.jpg',
  },
  {
    title: 'Pralnie samoobsługowe',
    subtitle:
      'Samoobsługowa pralnia to dochodowy biznes, który nie musi zajmować całego Twojego czasu.',
    image: 'selfservicelaundromats.jpg',
  },
  {
    title: 'Softwash, czyszczenie na sucho',
    subtitle:
      'Czy masz specjalne wymagania dotyczące prania odzieży wysokiej jakości, delikatnej lub ochronnej?',
    image: 'softwashanddrycleaning.jpg',
  },
  {
    title: 'Kluby sportowe',
    subtitle:
      'Potrzebujesz czystych, sprężystych i miękkich ręczników w swoim centrum sportowym, spa, łaźniach termalnych lub talasoterapii? Zobacz nasze maszyny szyte na miarę.',
    image: 'sportscenter.jpg',
  },
];

export default async () => {
  const existingCustomers = await Customer.find({}, '_id');
  if (existingCustomers.length === 0) {
    await Customer.create(data);
  }
};

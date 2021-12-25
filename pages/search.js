import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

const Search = ({ searchResults }) => {
  const router = useRouter();

  const { location, startDate, endDate, guests } = router.query;

  // const formatStartDate = format(new Date(startDate), 'dd MMMM yy');
  // const formatEndDate = format(new Date(endDate), 'dd MMMM yy');
  // const range = `${formatStartDate} = ${formatEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} |  | ${guests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays fro 5 numbers of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div
            className="hidden lg:inline-flex mb-5 
          space-x-3 text-gray-800 whitespace-nowrap"
          >
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Price</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          {searchResults.map((item, index) => (
            <InfoCard
              key={index}
              img={item.img}
              location={item.location}
              title={item.title}
              description={item.description}
              star={item.star}
              price={item.price}
              total={item.total}
            />
          ))}
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

// await fetch('https://links.papareact.com/isz')
export async function getServerSideProps() {
  const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}

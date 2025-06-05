import React from "react";
// Components
import Card from "../components/Card";
import useProducts from "../hooks/useProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from '../components/form-ui/Button.jsx'

const Home = () => {
  const { list, loading, hasMore, loadMore } = useProducts();

  const [isAscending, setIsAscending] = React.useState(false)

  const sortedList = list.sort((a,b) => isAscending  ?  a.price - b.price : b.price - a.price)

  return (
    <section className=" flex flex-col">
      <div className='flex justify-between' >

      <h1 className="font-medium mb-4">
        Products For You {loading && "(Loading...)"}
      </h1>

    <Button onClick={()=>{ setIsAscending(!isAscending) }} >Change Sort : {isAscending ? 'ASC': "DESC"}</Button>

      </div>
      <div
        className="overflow-auto h-[calc(100vh-8.5rem)] md:h-[calc(100vh-11.5rem)]"
        data-testid="scrollableDiv"
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={list.length} // This is important field to render the next data
          next={loadMore} // Function to load more data
          hasMore={hasMore} // Condition to check if more data is available
          loader={<h4 className="text-center ">Loading more...</h4>}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          scrollableTarget="scrollableDiv"
        >
          {sortedList.map((row) => (
            <Card
              key={row.id}
              name={row.name}
              price={row.price}
              id={row.id}
              description={row.description}
              image={row.img_url}
            />
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Mapping fetched data */}
      {list.map((row) => (
        <Card
          name={row.name}
          price={row.price}
          id={row.id}
          description={row.description}
          image={row.img_url}
        />
      ))}
    </section>
  );
};

export default Home;

import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";

function HomePage(props) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // fetch(getCoinList())
    //   .then((res) => res.json())
    //   .then((json) => setCoins(json));

    setIsLoading(true);

    const getData = async () => {
      const res = await fetch(getCoinList(page));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };

    getData();
  }, [page]);

  return (
    <div>
      <Pagination page={page} setPage={setPage} />
      <TableCoin coins={coins} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;

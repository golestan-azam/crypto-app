import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage(props) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    // fetch(getCoinList())
    //   .then((res) => res.json())
    //   .then((json) => setCoins(json));

    setIsLoading(true);

    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;

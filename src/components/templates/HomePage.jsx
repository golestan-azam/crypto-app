import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

function HomePage(props) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currecy, setCurrency] = useState("usd");

  useEffect(() => {
    // fetch(getCoinList())
    //   .then((res) => res.json())
    //   .then((json) => setCoins(json));

    setIsLoading(true);

    const getData = async () => {
      const res = await fetch(getCoinList(page, currecy));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };

    getData();
  }, [page,currecy]);

  return (
    <div>
      <Search currecy={currecy} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    // eslint-disable-next-line
    const filteredData = cryptosList?.data?.coins.filter(
      (item) =>
        // eslint-disable-next-line
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      // eslint-disable-next-line
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        // eslint-disable-next-line
        <div className='search-crypto'>
          <Input
            // eslint-disable-next-line
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <Row
        gutter={[32, 32]}
        // eslint-disable-next-line
        className='crypto-card-container'
      >
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            // eslint-disable-next-line
            className='crypto-card'
            key={currency.uuid}
          >
            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  // eslint-disable-next-line
                  <img
                    // eslint-disable-next-line
                    className='crypto-image'
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;

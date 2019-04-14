import React from 'react';
import BungieImage from '../dim-ui/BungieImage';
import classNames from 'classnames';
import '../progress/milestone.scss';
import { VendorSaleItem, VendorCost } from './vendor.service';
import styles from '../d2-vendors/VendorItem.m.scss';
import { VendorItemDisplay } from 'app/d2-vendors/VendorItemComponent';

interface Props {
  saleItem: VendorSaleItem;
  owned: boolean;
  totalCoins: {
    [currencyHash: number]: number;
  };
}

export default class D1VendorItem extends React.Component<Props> {
  render() {
    const { saleItem, owned, totalCoins } = this.props;

    return (
      <VendorItemDisplay
        item={saleItem.item}
        owned={owned}
        unavailable={!saleItem.unlocked}
        extraData={{ failureStrings: [saleItem.failureStrings] }}
      >
        {saleItem.costs.length > 0 && (
          <div className={styles.vendorCosts}>
            {saleItem.costs.map((cost) => (
              <D1VendorItemCost key={cost.currency.itemHash} cost={cost} totalCoins={totalCoins} />
            ))}
          </div>
        )}
      </VendorItemDisplay>
    );
  }
}

function D1VendorItemCost({
  cost,
  totalCoins
}: {
  cost: VendorCost;
  totalCoins: {
    [currencyHash: number]: number;
  };
}) {
  return (
    <div
      className={classNames(styles.cost, {
        [styles.notEnough]: totalCoins[cost.currency.itemHash] < cost.value
      })}
    >
      {cost.value}{' '}
      <span className={styles.currency}>
        <BungieImage src={cost.currency.icon} title={cost.currency.itemName} />
      </span>
    </div>
  );
}

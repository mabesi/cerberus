"use client";

import React from "react";

export default function CardLineChart() {
  React.useEffect(() => {
    
    const tv = new TradingView.widget({
      "autosize": true,
      "symbol": "BINANCE:BTCUSDT",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "br",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "studies": [
        "STD;VWMA"
      ],
      "container_id": "tradingview_d08aa",
    });

  }, []);
  return (
    <>
      <div class="tradingview-widget-container">
        <div id="tradingview_d08aa" style={{height:450}}></div>
      </div>
    </>
  );
}

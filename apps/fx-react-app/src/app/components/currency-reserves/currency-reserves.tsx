import React from "react";

import { CurrencyReserve } from "@fx/ui-core-data";

import { Col } from "../col/col";
import { Row } from "../row/row";
import { Reserve } from "./reserve";

interface CurrencyReservesProps {
  base: CurrencyReserve<number>;
  quote: CurrencyReserve<number>;
}
export const CurrencyReserves = ({ base, quote }: CurrencyReservesProps) => (
  <Row>
    <Col>
      <Reserve reserve={base} />
    </Col>
    <Col>
      <Reserve reserve={quote} />
    </Col>
  </Row>
);

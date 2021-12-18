import { Account } from "../account/types";
import { Network } from "../networks/types";
import { Address, AmountClientLib } from "../types";

export type InteractionStatus =
  | "completed"
  | "pending"
  | "declined"
  | "canceled"
  | "changed"
  | "closed";

export type ProcessingStatus = "sent" | "pending" | "confirmed";

export type Direction = "sent" | "received";

export type EventFromLib = {
  type: string;
  timestamp: number;
  blockNumber: number;
  status: ProcessingStatus;
  transactionHash: string;
  blockHash: string;
  logIndex: number;
  from: string;
  to: string;
  direction: Direction;
  counterParty: string;
  user: string;
  networkAddress: string;
};

export type Event = EventFromLib & {
  id: string;
  accountAddress: Address;
  status?: null;
  processingStatus: ProcessingStatus;

  account?: Account;
  network?: Network;
  billId?: string;
};

export type NormalizedEvent = EventFromLib & {
  id: string;
  accountAddress: Address;
  status?: null;
  processingStatus: ProcessingStatus;

  account?: string;
  contact?: string;
  network?: string;
};

export type EnrichedEvent = Event & {
  interactionStatus?: InteractionStatus;
  unread?: boolean;
  mergedEventIds?: string[];
  counterPartyRemoteName?: string;
};

export type TransferEventFromLib = EventFromLib & {
  amount: AmountClientLib;
  extraData?: string;
  paymentRequestId?: string;
  transferId?: string;
  remainingData?: string;
};

export type TransferDetailsFromLib = {
  path: Address[];
  feePayer: "sender" | "receiver";
  totalFees: AmountClientLib;
  feesPaid: AmountClientLib[];
  extraData: string;
};

export type TransferDetails = {
  path: Address[];
  feePayer: "sender" | "receiver";
  totalFees: number;
  feesPaid: number[];
  extraData: string;
};

export type NormalizedTransferEvent = NormalizedEvent & {
  amount: number;
  extraData?: string;
  paymentRequestId?: string;
  transferId?: string;
  remainingData?: string;
  // additional data, which is retrieved from a separate endpoint
  details?: TransferDetails;
};

export type EnrichedTransferEvent = EnrichedEvent & {
  amount: number;
  extraData?: string;
  paymentRequestId?: string;
  transferId?: string;
  remainingData?: string;
  // additional data, which is retrieved from a separate endpoint
  details?: TransferDetails;
};

export type TrustlineUpdateRequestEventFromLib = EventFromLib & {
  given: AmountClientLib;
  received: AmountClientLib;
  interestRateGiven: AmountClientLib;
  interestRateReceived: AmountClientLib;
};

export type NormalizedTrustlineUpdateRequestEvent = NormalizedEvent & {
  given: number;
  received: number;
  interestRateGiven: number;
  interestRateReceived: number;
};

export type EnrichedTrustlineUpdateRequestEvent = EnrichedEvent & {
  given: number;
  received: number;
  interestRateGiven: number;
  interestRateReceived: number;
  originalRequestDirection?: string;
  transfer?: AmountClientLib;
};

export type TrustlineUpdateEventFromLib = TrustlineUpdateRequestEventFromLib;

export type NormalizedTrustlineUpdateEvent =
  NormalizedTrustlineUpdateRequestEvent;

export type EnrichedTrustlineUpdateEvent = EnrichedTrustlineUpdateRequestEvent;

export type TrustlineUpdateCancelFromLib = EventFromLib;

export type NormalizedTrustlineUpdateCancelEvent = NormalizedEvent;

export type EnrichedTrustlineUpdateCancelEvent = EnrichedEvent;

export type SplitBillEvent = EnrichedEvent & {
  billId: string;
};

export type BalanceUpdateEventFromLib = EventFromLib & {
  balance: AmountClientLib;
  given: AmountClientLib;
  received: AmountClientLib;
  leftGiven: AmountClientLib;
  leftReceived: AmountClientLib;
};

export type NetworkBalanceUpdateEventFromLib = BalanceUpdateEventFromLib & {
  frozenBalance?: AmountClientLib;
};

export type AnyNormalizedEvent =
  | NormalizedTransferEvent
  | NormalizedTrustlineUpdateRequestEvent
  | NormalizedTrustlineUpdateEvent
  | NormalizedTrustlineUpdateCancelEvent;

export type AnyEnrichedEvent =
  | EnrichedTransferEvent
  | EnrichedTrustlineUpdateRequestEvent
  | EnrichedTrustlineUpdateEvent
  | EnrichedTrustlineUpdateCancelEvent
  | SplitBillEvent;

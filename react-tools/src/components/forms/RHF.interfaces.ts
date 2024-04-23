import { ReactElement } from "react";

/**
 * @title Field State
 */
export enum InputState {
  BEF = "BEF",
  FOC = "FOC",
  OUT = "OUT",
}

export type SelectOptionType = {
  label: string;
  value: any;
};

export interface RHFInputType<T> {
  type?: string;
  label?: string;
  name: string;
  startDecorator?: ReactElement;
  endDecorator?: ReactElement;
  onChange?: (data: T) => T;
  options?: Array<SelectOptionType>;
  endPoint?: boolean;
}

export enum StackDirection {
  ROW = "row",
  COL = "column",
}

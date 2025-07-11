import { MathLib } from "@morpho-org/blue-sdk";
import { SimulationErrors } from "../../errors.js";
import type { BlueOperation } from "../../operations.js";
import type { OperationHandler } from "../types.js";

import { handleBlueAccrueInterestOperation } from "./accrueInterest.js";
import { handleBlueBorrowOperation } from "./borrow.js";
import { handleBlueParaswapBuyDebtOperation } from "./buyDebt.js";
import { handleBlueFlashLoanOperation } from "./flashLoan.js";
import { handleBlueRepayOperation } from "./repay.js";
import { handleBlueSetAuthorizationOperation } from "./setAuthorization.js";
import { handleBlueSupplyOperation } from "./supply.js";
import { handleBlueSupplyCollateralOperation } from "./supplyCollateral.js";
import { handleBlueWithdrawOperation } from "./withdraw.js";
import { handleBlueWithdrawCollateralOperation } from "./withdrawCollateral.js";

export const handleBlueOperation: OperationHandler<BlueOperation> = (
  operation,
  data,
) => {
  if ("assets" in operation.args) {
    const { assets = 0n } = operation.args;

    if (assets < 0n) throw new SimulationErrors.InvalidInput({ assets });
  }

  if ("shares" in operation.args) {
    const { shares = 0n } = operation.args;

    if (shares < 0n) throw new SimulationErrors.InvalidInput({ shares });
  }

  if ("slippage" in operation.args) {
    const { slippage = 0n } = operation.args;

    if (slippage < 0n || slippage > MathLib.WAD)
      throw new SimulationErrors.InvalidInput({ slippage });
  }

  switch (operation.type) {
    case "Blue_AccrueInterest":
      return handleBlueAccrueInterestOperation(operation, data);
    case "Blue_SetAuthorization":
      return handleBlueSetAuthorizationOperation(operation, data);
    case "Blue_Borrow":
      return handleBlueBorrowOperation(operation, data);
    case "Blue_Repay":
      return handleBlueRepayOperation(operation, data);
    case "Blue_Supply":
      return handleBlueSupplyOperation(operation, data);
    case "Blue_SupplyCollateral":
      return handleBlueSupplyCollateralOperation(operation, data);
    case "Blue_Withdraw":
      return handleBlueWithdrawOperation(operation, data);
    case "Blue_WithdrawCollateral":
      return handleBlueWithdrawCollateralOperation(operation, data);
    case "Blue_FlashLoan":
      return handleBlueFlashLoanOperation(operation, data);
    case "Blue_Paraswap_BuyDebt":
      return handleBlueParaswapBuyDebtOperation(operation, data);
  }
};

import Finance from "../models/Finance.js";
import { successResponse } from "../utils/response.js";


// Get dashboard summary: total income, total expense, balance
export const getSummary = async (req, res) => {
    const income = await Finance.aggregate([
        { $match: { type: "income" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Finance.aggregate([
        { $match: { type: "expense" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return successResponse(res, "Dashboard summary", {
        totalIncome: income[0]?.total || 0,
        totalExpense: expense[0]?.total || 0,
        balance: (income[0]?.total || 0) - (expense[0]?.total || 0),
    });
};

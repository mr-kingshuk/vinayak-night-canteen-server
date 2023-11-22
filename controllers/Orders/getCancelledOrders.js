import { ordersModel } from "../../models/Orders/Orders.js";

const getCancelledOrders = async (req, res) => {
    const LIMIT_PER_PAGE = 10;
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.per_page) > LIMIT_PER_PAGE ? LIMIT_PER_PAGE : parseInt(req.query.per_page);

    try {
        const totalOrders = await ordersModel.countDocuments({ status: "Cancelled" });
        const totalPages = Math.ceil(totalOrders / perPage);
        const skippedOrders = (page - 1) * perPage;
        const itemsOnPage = page === totalPages ? (totalOrders - skippedOrders) : perPage;

        if (page > totalPages) {
            return res.status(400).json(
                {
                    "error": "Invalid Page Number",
                    "metadata": {
                        "total_items": totalOrders,
                        "items_on_page": itemsOnPage,
                        "current_page": page,
                        "total_pages": totalPages,
                    }
                })
        }
        if (totalOrders === 0)
            return res.status(400).json({ "error": "No orders found" })

        const orders = await ordersModel.find({ status: "Cancelled" }).populate('userId').sort({ createdAt: -1 }).skip(skippedOrders).limit(perPage);
        const output = {
            "data": orders,
            "metadata": {
                "total_items": totalOrders,
                "items_on_page": itemsOnPage,
                "current_page": page,
                "total_pages": totalPages,
            }
        }
        return res.status(200).json(output);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

export default getCancelledOrders;
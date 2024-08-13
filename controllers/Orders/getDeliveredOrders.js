import { ordersModel } from "../../models/Orders/Orders.js";
import { startOfDay, endOfDay } from 'date-fns';

const getDeliveredOrders = async (req, res) => {
    const { date } = req.query;
    const formattedDate = new Date(date);
    const LIMIT_PER_PAGE = 10;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) > LIMIT_PER_PAGE 
    ? LIMIT_PER_PAGE 
    : (isNaN(parseInt(req.query.per_page)) ? LIMIT_PER_PAGE : parseInt(req.query.per_page));

    try {

        const totalOrders = await ordersModel.countDocuments({ status: "Delivered", createdAt: {
            $gte: startOfDay(formattedDate),
            $lt: endOfDay(formattedDate), 
          }});
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

       
        const orders = await ordersModel.find({ 
            status: "Delivered" , 
            createdAt: {
              $gte: startOfDay(formattedDate),
              $lt: endOfDay(formattedDate), 
            }}).populate('userId').sort({ createdAt: -1 }).skip(skippedOrders).limit(perPage);

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

export default getDeliveredOrders;
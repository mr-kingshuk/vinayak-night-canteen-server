import dotenv from "dotenv";
dotenv.config();
import { validatePaymentVerification, validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import { ordersModel } from "../../models/Orders/Orders.js";


const paymentVerify = async (req, res) => {
    const { razorpay_payment_id,  razorpay_order_id, razorpay_signature } = req.body;
    const orderId = req.query.orderId;
    const SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;

    const order = await ordersModel.find({ _id: orderId, status: "Accepted" });
    const razorpayOrderId = order[0].razorpayOrderId;

    const requestBody = {
        order_id: razorpayOrderId,
        payment_id: razorpay_payment_id,
    };

    if (validatePaymentVerification(requestBody, razorpay_signature, SECRET_KEY)) {
        const updatedOrder = await ordersModel.findOneAndUpdate(
            { _id: orderId },
            {
              $set: {
                paymentStatus: true,
                razorpayPaymentId: razorpay_payment_id,
              },
            },
            { new: true }
          );

        res.redirect(`http://localhost:5173/${orderId}`);
    }
    else {
        res.redirect('http://localhost:5173/');
    }
};

export default paymentVerify;
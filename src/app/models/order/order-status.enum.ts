    export enum OrderStatus
    {
        New = 1,
        Pending = 2,
        DeliveredToCourier = 3,
        Delivered = 4,
        NotReachable = 5,
        Postponed = 6,
        PartiallyDelivered = 7,
        CancelledByRecipient = 8,
        RejectedWithPayment = 9,
        RejectedWithPartialPayment = 10,
        RejectedWithoutPayment = 11
    }

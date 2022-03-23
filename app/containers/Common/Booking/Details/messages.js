/**
 * Messages
 *
 * This contains all the text for the container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Orders.Details';

export default defineMessages({
  contentTitleCustomer: {
    id: `${scope}.contentTitleCustomer`,
    defaultMessage: 'Customer Details',
  },
  contentTitleOrderDetails: {
    id: `${scope}.contentTitleOrderDetails`,
    defaultMessage: 'Order Details',
  },
  contentTitlePaymentInformation: {
    id: `${scope}.contentTitlePaymentInformation`,
    defaultMessage: 'Payment Information',
  },
  contentTitleOrderHistory: {
    id: `${scope}.contentTitleOrderHistory`,
    defaultMessage: 'Order History',
  },
  tableId: {
    id: `${scope}.tableId`,
    defaultMessage: 'ID',
  },
  tableImage: {
    id: `${scope}.tableImage`,
    defaultMessage: 'Image',
  },
  tableName: {
    id: `${scope}.tableName`,
    defaultMessage: 'Name',
  },
  tableQty: {
    id: `${scope}.tableQty`,
    defaultMessage: 'Qty',
  },
  tableVariations: {
    id: `${scope}.tableVariations`,
    defaultMessage: 'Variations',
  },
  tableTotalPrice: {
    id: `${scope}.tableTotalPrice`,
    defaultMessage: 'Total Price',
  },
  labelFirstName: {
    id: `${scope}.labelFirstName`,
    defaultMessage: 'First Name',
  },
  labelLastName: {
    id: `${scope}.labelLastName`,
    defaultMessage: 'Last Name',
  },
  labelEmail: {
    id: `${scope}.labelEmail`,
    defaultMessage: 'Email',
  },
  labelPhoneNumber: {
    id: `${scope}.labelPhoneNumber`,
    defaultMessage: 'Phone Number',
  },
  labelCountry: {
    id: `${scope}.labelCountry`,
    defaultMessage: 'Country',
  },
  labelOrderDate: {
    id: `${scope}.labelOrderDate`,
    defaultMessage: 'Order Date',
  },
  labelOrderStatus: {
    id: `${scope}.labelOrderStatus`,
    defaultMessage: 'Order Status',
  },
  labelOrderFrom: {
    id: `${scope}.labelOrderFrom`,
    defaultMessage: 'Order From',
  },
  contentTitleOrderItems: {
    id: `${scope}.contentTitleOrderItems`,
    defaultMessage: 'Order Items',
  },
  labelTender: {
    id: `${scope}.labelTender`,
    defaultMessage: 'Tender',
  },
  labelTransactionIds: {
    id: `${scope}.labelTransactionIds`,
    defaultMessage: 'Transaction IDs',
  },
  labelTotalAmount: {
    id: `${scope}.labelTotalAmount`,
    defaultMessage: 'Total Amount',
  },
});

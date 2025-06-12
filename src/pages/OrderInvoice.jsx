// OrderInvoice.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  heading: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
});

const OrderInvoice = ({ order }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
        <Text>Invoice ID: {order.id}</Text>
        <Text>Customer: {order.userName}</Text>
        <Text>Date: {new Date(order.time).toLocaleString()}</Text>
        <Text>Payment Method: {order.paymentMethod}</Text>
      </View>
      <View style={styles.section}>
        <Text>Product: {order.productName}</Text>
        <Text>Price: ₹{order.price}</Text>
      </View>
      <Text>Thank you for your order!</Text>
    </Page>
  </Document>
);

export default OrderInvoice;

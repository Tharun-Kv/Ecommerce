import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed (optional but recommended for professional look)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
  },
  companyInfo: {
    width: '60%',
  },
  invoiceInfo: {
    width: '35%',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a365d',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a365d',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d3748',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    width: '48%',
  },
  productSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  productImageCell: {
    width: '20%',
  },
  productDetailsCell: {
    width: '40%',
    paddingLeft: 10,
  },
  productPriceCell: {
    width: '15%',
    textAlign: 'right',
  },
  productQtyCell: {
    width: '10%',
    textAlign: 'right',
  },
  productTotalCell: {
    width: '15%',
    textAlign: 'right',
  },
  productImage: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 4,
  },
  totalsSection: {
    marginTop: 20,
    marginLeft: 'auto',
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
    borderTopStyle: 'solid',
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    fontSize: 10,
    textAlign: 'center',
    color: '#718096',
  },
  notes: {
    marginTop: 20,
    fontSize: 10,
    color: '#718096',
  },
});

const OrderInvoice = ({ order }) => {
  // Calculate taxes and totals
  const subtotal = order.price;
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const grandTotal = subtotal + gstAmount;

  return (
    <Document>
      <Page style={styles.page} size="A4">
        {/* Header with company info and invoice details */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Techverve Store</Text>
            <Text>jp nagara</Text>
            <Text>Bengaluru,karnataka State 123456</Text>
            <Text>Phone:8277487233</Text>
            <Text>Email: contact@techvervstore.com</Text>
            <Text>GSTIN: 22AAAAA0000A1Z5</Text>
          </View>
          
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>Invoice #: {order.id}</Text>
            <Text>Date: {new Date(order.time).toLocaleDateString()}</Text>
            <Text>Due Date: {new Date(order.time).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Bill To section */}
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text>{order.userName}</Text>
            <Text>Customer Address Line 1</Text>
            <Text>Customer City, State ZIP</Text>
            <Text>Phone: Customer Phone</Text>
          </View>
          
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Text>{order.paymentMethod}</Text>
            <Text>Status: Paid</Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          
          {/* Table Header */}
          <View style={[styles.productRow, { fontWeight: 'bold' }]}>
            <Text style={styles.productImageCell}>Image</Text>
            <Text style={styles.productDetailsCell}>Description</Text>
            <Text style={styles.productPriceCell}>Unit Price</Text>
            <Text style={styles.productQtyCell}>Qty</Text>
            <Text style={styles.productTotalCell}>Total</Text>
          </View>
          
          {/* Product Row */}
          <View style={styles.productRow}>
            <View style={styles.productImageCell}>
              {order.productImage && (
                <Image
                  src={order.productImage}
                  style={styles.productImage}
                />
              )}
            </View>
            <View style={styles.productDetailsCell}>
              <Text style={{ fontWeight: 'bold' }}>{order.productName}</Text>
              <Text>SKU: {order.id}</Text>
              <Text>Color: Black</Text>
              <Text>Size: Medium</Text>
            </View>
            <Text style={styles.productPriceCell}>₹{order.price.toFixed(2)}</Text>
            <Text style={styles.productQtyCell}>1</Text>
            <Text style={styles.productTotalCell}>₹{order.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text>₹{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST (18%):</Text>
            <Text>₹{gstAmount.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text>₹{grandTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notes}>
          <Text>Notes:</Text>
          <Text>- Thank you for your business!</Text>
          <Text>- Payment is due within 15 days</Text>
          <Text>- Please include invoice number with payment</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Your Company Name | Phone: (123) 456-7890 | Email: contact@yourcompany.com</Text>
          <Text>Terms & Conditions apply</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderInvoice;
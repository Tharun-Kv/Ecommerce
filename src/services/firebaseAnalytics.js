import { db } from '../pages/firebase-config';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';

// Helper to format Firestore timestamp
const formatFirestoreDate = (dateObj) => {
  return Timestamp.fromDate(new Date(dateObj));
};

// Track user activity
export const trackUserActivity = async (userId, activityType, details = {}) => {
  try {
    await addDoc(collection(db, 'userActivities'), {
      userId,
      activityType,
      details,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};

// Get sales analytics
export const fetchSalesAnalytics = async (startDate, endDate, groupBy = 'daily') => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('time', '>=', formatFirestoreDate(startDate)),
      where('time', '<=', formatFirestoreDate(endDate)),
      where('status', '==', 'completed'),
      orderBy('time')
    );

    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      time: doc.data().time.toDate(),
    }));

    const groupedData = {};
    orders.forEach((order) => {
      let periodKey;
      const date = order.time;

      if (groupBy === 'daily') {
        periodKey = format(date, 'yyyy-MM-dd');
      } else if (groupBy === 'weekly') {
        periodKey = `${format(date, 'yyyy')}-${format(date, 'ww')}`;
      } else {
        periodKey = format(date, 'yyyy-MM');
      }

      if (!groupedData[periodKey]) {
        groupedData[periodKey] = {
          period: periodKey,
          total: 0,
          count: 0,
        };
      }

      groupedData[periodKey].total += order.totalAmount || 0;
      groupedData[periodKey].count += 1;
    });

    return Object.values(groupedData);
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

// Get top products
export const fetchTopProducts = async (startDate, endDate, limit = 5) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('time', '>=', formatFirestoreDate(startDate)),
      where('time', '<=', formatFirestoreDate(endDate)),
      where('status', '==', 'completed')
    );

    const snapshot = await getDocs(q);
    const productSales = {};

    snapshot.forEach((doc) => {
      const order = doc.data();
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            productId: item.productId,
            productName: item.name,
            totalSales: 0,
            count: 0,
          };
        }
        productSales[item.productId].totalSales += item.price * item.quantity;
        productSales[item.productId].count += item.quantity;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get user activity stats
export const fetchUserActivityStats = async (startDate, endDate) => {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      where('time', '>=', formatFirestoreDate(startDate)),
      where('time', '<=', formatFirestoreDate(endDate)),
      orderBy('time')
    );

    const usersSnapshot = await getDocs(usersQuery);
    const signups = usersSnapshot.docs.map((doc) => ({
      date: doc.data().time.toDate(),
      count: 1,
    }));

    const activitiesQuery = query(
      collection(db, 'userActivities'),
      where('timestamp', '>=', formatFirestoreDate(startDate)),
      where('timestamp', '<=', formatFirestoreDate(endDate))
    );

    const activitiesSnapshot = await getDocs(activitiesQuery);
    const activities = activitiesSnapshot.docs.map((doc) => doc.data().activityType);

    return {
      signups: signups.reduce((acc, curr) => {
        const dateStr = format(curr.date, 'yyyy-MM-dd');
        if (!acc[dateStr]) {
          acc[dateStr] = { date: curr.date, count: 0 };
        }
        acc[dateStr].count += 1;
        return acc;
      }, {}),
      activities: activities.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

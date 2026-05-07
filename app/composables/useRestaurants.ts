import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';

export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  category: string;
  phone: string;
  kakaoUrl: string;
  latitude: number;
  longitude: number;
  createdAt: any;
}

export const useRestaurants = () => {
  const { $db } = useNuxtApp();
  const restaurants = ref<Restaurant[]>([]);
  const loading = ref(false);

  // Fetch restaurants (API: Firestore Real-time)
  const fetchRestaurants = () => {
    loading.value = true;
    const q = query(collection($db, 'restaurants'), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      restaurants.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];
      loading.value = false;
    });
  };

  // Add restaurant (API: POST /restaurants)
  const addRestaurant = async (restaurant: Omit<Restaurant, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection($db, 'restaurants'), {
        ...restaurant,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error adding restaurant: ", error);
      throw error;
    }
  };

  // Recommendation logic
  const recommendLunch = () => {
    if (restaurants.value.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * restaurants.value.length);
    return restaurants.value[randomIndex];
  };

  return {
    restaurants,
    loading,
    fetchRestaurants,
    addRestaurant,
    recommendLunch
  };
};
